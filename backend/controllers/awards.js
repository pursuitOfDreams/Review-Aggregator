const pool = require("../db");
const {
    get_movie_awards,
    is_movie,
    post_movie_award,
    get_celeb_award_id,
    is_award,
    is_celeb,
    add_award_celeb,
    get_all_awards
} = require("../models/awards");

const get_award = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const award_id = req.params.award_id
            const movie_list = await get_movie_awards(award_id)

            return res.status(201).json({movie : movie_list})
        }
        else return res.status(400).json({message : "Login to view movies list})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Server error"})
    }
}

const post_award = async (req, res) => {
    try{
        if(req.session.is_logged_in && req.session.is_admin){
            const award_name = req.params.award_name
            const award_cat = req.params.award_cat
            const year = req.params.year
            const movie_id = req.params.movie_id
            const ins = await is_movie(movie_id)
            if(ins.rows.length == 0)
                return res.status(400).json({message : "Movie does not exist"});
            else{
                const post_details = await post_movie_award(award_name, award_cat, year, movie_id);
                return res.status(201).json({message : "Movie inserted successfully"});
            }
        }
        else return res.status(400).json({message : "Only admins have access"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_award_celeb = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const celeb_id = req.params.celeb_id
            const awards = await get_celeb_award_id(celeb_id)
            return res.status(201).json({awards : awards})
        }
        else return res.status(400).json({message : "Login to view awards"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const post_award_celeb = async (req, res) => {
    try{
        if(req.session.is_logged_in && req.session.is_admin){
            const award_id = req.params.award_id;
            const celeb_id = req.params.celeb_id;
            const aw = await is_award(award_id);
            if(aw.rows.length == 0)
                return res.status(404).json({message : "Invalid Award Id"});
            const ce = await is_celeb(celeb_id);
            if(ce.rows.length == 0)
                return res.status(404).json({message : "Invalid Movie Id"});
            const post_celeb_details = await add_award_celeb(award_id, celeb_id);
            return res.status(201).json({message : "Movie inserted successfully"});
        }
        else return res.status(400).json({message : "Only admins have access"});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message : "Server Error});
    }
}

const all_awards = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const awards = await get_all_awards();
            return res.status(201).json({awards : awards});
        }
        else return res.status(400).json({message : "Login to get awards"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

module.exports = {
    get_award,
    post_award,
    get_award_celeb,
    post_award_celeb,
    all_awards
}
