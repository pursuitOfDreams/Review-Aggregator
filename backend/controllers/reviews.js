const pool = require("../db");
const {
    get_rev,
    has_posted,
    rem_post,
    update_rating,
    post_rev,
    get_single_review
} = require("../models/review_model");

const get_movie_reviews = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const movie_id = req.params.movie_id;
            const movie_reviews = await get_rev(movie_id);
            return res.status(200).json({reviews : movie_reviews});
        }
        else
            return res.status(400).json({message : "Login to see reviews"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const post_movie_reviews = async (req, res) => {
    try{
        if(req.session.is_logged_in){
            const movie_id = req.body.movie_id;
            const user_id = req.session.user_id;
            const reviewtext = req.body.review_text;
            const rating = req.body.rating;
            const posted = await has_posted(user_id, movie_id);
            if(posted.rows.length == 0)
            {
                const rem = await rem_post(user_id, movie_id);
                const update = await update_rating(movie_id);
            }
            const post = await post_rev(movie_id, user_id, reviewtext, rating);
            const update = await update_rating(movie_id);
            const count = await update_count(movie_id);
            return res.status(201).json({message : "Uploaded review"})
        }
        else
            return res.status(400).json({message : "Login to upload review"})

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_review = async(req, res) => {
    try {
        if(req.session.is_logged_in){
            const movie_id = req.body.movie_id;
            const user_id = req.body.user_id;
            const single_review = await get_single_review(user_id, movie_id);
            if(single_review.rows.length == 0){
                return res.status(404).json({message : "No such review found"});
            }
            return res.status(200).json({review : single_review});
        }
        else{
            return res.status(400).json({message : "Login to see review"});
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

module.exports = {
    get_movie_reviews,
    post_movie_reviews,
    get_review
}
