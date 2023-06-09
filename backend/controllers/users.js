const pool = require("../db");
const bcrypt = require("bcrypt")
const {
    get_user_cred,
    insert_user
} = require("../models/viewers");

const { user_watchlist } = require("../models/watchlist");

const { user_reviews } = require("../models/reviews");

const check_auth = (req, res, next) => {
    if (req.session.is_logged_in) next();
    else return res.status(401).json({ message : "Failed to authenticate"})
}

const login_user = async (req, res) =>{
    try{
        const { user_id, password } = req.body;
        const user_creds = await get_user_cred(user_id);

        // if the user is found in the database
        if (user_creds.rows.length > 0) {
            const user_password = user_creds.rows[0].user_password;
            const user_id = user_creds.rows[0].user_id;
            const valid_password = await bcrypt.compare(password, user_password);
            
            // if the password does not match
            if (!valid_password) 
                return res.status(401).json({message : "Password is invalid for the given user id"});
            
            // then admin level of privileges
            if (user_creds.rows[0].prioritylevel==1)
                req.session.is_admin = true; // TODO:
            else req.session.is_admin = false;
            req.session.is_logged_in = true;
            req.session.user_id = user_id;

            return req.session.save((err)=>{
                res.send({message : "user logged in"});
            })
        }
        // couldn't find the user in the database
        else return res.status(401).json({message :"Could not find the user with the given user ID"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const logout = async (req, res) => {
    req.session.is_logged_in = false;
    req.session.is_admin = false;
    req.session.destroy();
    return res.status(200).json({message : "logged out"});
}

const signup_user = async (req, res) => {
    try{
        // confirm the password at the frontend only
        const { user_id, user_name, password } = req.body;
        // check if the user is already in the database
        const check = await get_user_cred(user_id);

        // no user with the given id found then register the user
        if (check.rows.length == 0){
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
            const hashed_password =await bcrypt.hash(password, salt)
            const user = await insert_user(user_id, user_name,hashed_password)
            return res.status(201).json({
                user_id : user_id,
                user_name : user_name
            })
        }
        else return res.status(400).json({message : "User with given ID already exist"});
    }
    catch (err){
        console.log(err)
        return res.status(500).json({message : "Couldn't create user"});
    }
}

const get_watchlist = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const watchlist = await user_watchlist(req.session.user_id)
            return res.status(201).json({
                watchlist: watchlist
            })
        }
        else return res.status(400).json({message : "Login to view watchlist"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Couldn't get watchlist"})
    }
}

const get_reviews = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const reviews = await user_reviews(req.session.user_id)
            return res.status(201).json({
                reviews : reviews
            })
        }
        else return res.status(400).json({message : "Login to view reviews"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Couldn't get reviews"})
    }
}

module.exports = {
    check_auth,
    login_user,
    logout,
    signup_user,
    get_watchlist,
    get_reviews
}
