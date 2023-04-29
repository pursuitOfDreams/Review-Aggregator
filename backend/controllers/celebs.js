const pool = require("../db");


const get_celeb_info = async (req, res) =>{
    try{
        if (req.session.is_logged_in){
            const { celeb_id } = req.body;
            const celeb_details = await get_celeb_detail(celeb_id);
            if (celeb_details.rows.length==0)
                return res.status(404).json({message : "Celeb was not found with id ${celeb_id}"});
            return res.status(201).json({ celeb_info : celeb_details});
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
            if (celeb_details.rows.length==0)
                return res.status(404).json({message : "Celeb was not found with id ${celeb_id}"});
            return res.status(201).json({ celeb_info : celeb_details});
        }
        else return res.status(400).json({message : "Login required to access the celeb info"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}

const put_celeb_info  = async (req, res) =>{
    try{
        if (req.session.is_logged_in && req.session.is_admin){
            const { celebId, primaryName, birthYear, deathYear, primaryProfession, Intro, userId } = req.body;
            const celeb_details = await update_celeb_detail(celebId, primaryName, birthYear, deathYear, primaryProfession, Intro, userId);
            if (celeb_details.rows.length==0)
                return res.status(404).json({message : "Celeb was not found with id ${celeb_id}"});
            return res.status(201).json({ celeb_info : celeb_details});
        }
        else return res.status(400).json({message : "Login required to access the celeb info"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error"})
    }
}


module.exports = {
    get_celeb_info,
    post_celeb_info,
    put_celeb_info
}
