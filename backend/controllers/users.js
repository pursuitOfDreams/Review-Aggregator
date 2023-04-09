const pool = require("../db");
const bcrypt = require("bcrypt")

const check_auth = (req, res, next) => {
    if (req.session.is_logged_in) next();
    else return res.status(401).json({ message : "Failed to authenticate"})
}

const login_user = async (req, res) =>{
    try{
        const { user_id, entered_password } = req.body;
        const user_creds = await pool.query(

        )
        // if the user is found in the database
        if (user_creds.rows.length > 0) {
            const user_password = user_creds.rows[0].hashed_password;
            const user_id = user_creds.rows[0].id;
            const valid_password = await bcrypt.compare(entered_password, user_password);
            
            // if the password does not match
            if (!valid_password) 
                return res.status(401).json({message : "Password is invalid for the given user id"});

            req.session.is_logged_in = true;
            res.session.user_id = user_id;
            res.session.is_admin = true; // TODO:

            return req.session.save((err)=>{
                console.log(err),
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

const create_user = async (req, res) => {
    try{
        // confirm the password at the frontend only
        const { user_id, password } = req.body;
        // check if the user is already in the database
        const check = await pool.query(
            
        )   
        
        // no user with the given id found then register the user
        if (check.rows.length == 0){

        }
        else return res.status(400).json({message : "User with given ID already exist"});
        
    }
    catch (err){

    }
}


module.exports = {
    check_auth,
    login_user,
    logout,
    create_user
}