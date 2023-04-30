const pool = require("../db");

const {
    get_celeb_details,
    add_celeb_detail,
    is_celeb,
    update_celeb_detail,
    get_movie_celebs,
    get_celebs
} = require("../models/celebs");

const get_celeb_info = async (req, res) =>{
    try{
        if (req.session.is_logged_in){
            const celeb_id = req.query.celeb_id;
            const celeb_details = await get_celeb_details(celeb_id);
            if (celeb_details.rows.length==0)
                return res.status(404).json({message : "Celeb was not found with id ${celeb_id}"});
            return res.status(200).json({ celeb_info : celeb_details});
        }
        else return res.status(400).json({message : "Login required to access the celeb info"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}

const post_celeb_info  = async (req, res) =>{
    try{
        if (req.session.is_logged_in && req.session.is_admin){
            const { primaryName, birthYear, deathYear, primaryProfession, Intro, userId } = req.body;
            const celeb_details = await add_celeb_detail(primaryName, birthYear, deathYear, primaryProfession, Intro, userId);
            return res.status(201).json({ message : "Inserted successfully"});
        }
        else return res.status(400).json({message : "Admin access required"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}

const put_celeb_info  = async (req, res) =>{
    try{
        if (req.session.is_logged_in){
            const { celebId, primaryName, birthYear, deathYear, primaryProfession, Intro, userId } = req.body;
            const same_user = await is_celeb(userId, celebId);
            if(same_user.rows.length == 0 && !req.session.is_admin)
                return res.status(400).json({message : "Celeb or admin permission required to edit data"});
            const celeb_details = await update_celeb_detail(celebId, primaryName, birthYear, deathYear, primaryProfession, Intro, userId);
            return res.status(201).json({ message : "Details updated"});
        }
        else return res.status(400).json({message : "You are not logged in"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}

const get_movie_celeb_info = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const movie_id = req.query.movie_id;
            const celebs = await get_movie_celebs(movie_id);
            return res.status(200).json({ celebs : celebs});
        }
        else return res.status(400).json({message : "Login to get celebs"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}

const get_celeb_list = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const celebs = await get_celebs();
            return res.status(200).json({ celebs : celebs});
        }
        else return res.status(400).json({message : "Login to get celebs"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}


module.exports = {
    get_celeb_info,
    post_celeb_info,
    put_celeb_info,
    get_movie_celeb_info,
    get_celeb_list
}
