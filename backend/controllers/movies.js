const pool = require("../db");
const {
    get_movie_details,
    get_all_movies,
    add_title_to_db,
    get_top250_series_details,
    get_title_by_genre,
    recommend,
    popular,
    get_genres
} = require("../models/movies");

const get_movie = async (req, res) =>{
    try{
        if(req.session.is_logged_in){
            const movie_id = req.params.movie_id;
            const movie_details = await get_movie_details(movie_id);

            if (movie_details.rows.length ==0 )
                return res.status(404).json({message : "Movie with given id ${movie_id}"});
            
            return res.status(200).json({movie : movie_details});
        }
        else return res.status(400).json({message : "Login to view movies list"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_movie_list = async (req, res) =>{
    try{
        if (req.session.is_logged_in){
            const movies_list = await get_all_movies();
            return res.status(200).json({movies : movies_list});
        }
        else return res.status(400).json({message : "Login to view movies list"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const add_movie = async (req, res) => {
    try{
        if (req.session.is_logged_in && req.session.is_admin){
            const {title_type, title, start_year, end_year, runtime_minutes, genre, link, views, avg_rating } = req.body;
            const post_movie_detail = await add_title_to_db(title_type, title, start_year, end_year, runtime_minutes, genre, link, views, avg_rating );
            return res.status(201).json({message : "Movie inserted successfully"});
        }
        else return res.status(400).json({message : "Only admins have access"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Couldn't insert movie successfully"});
    }
}

const edit_movie = async (req, res)=> {
    try{
        
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_top250_movies = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const top250_movie = await get_top250_movie_details();
            return res.status(200).json({ top_movie: top250_movie});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_top250_series = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const top250_series = await get_top250_series_details();
            return res.status(200).json({ top_series: top250_series});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_movie_by_genre = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const genres = req.params.genre_id;
            const movies_by_genre = await get_title_by_genre("movie", genres);
            return res.status(200).json({movies_list_by_genre : movies_by_genre});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_series_by_genre = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const genres = req.params.genre_id;
            const series_by_genre = await get_title_by_genre("series", genres);
            return res.status(200).json({series_list_by_genre : series_by_genre});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_rec = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const user_id = req.session.user_id;
            const recos = await recommend(user_id);
            return res.status(200).json({recos : recos});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_popular_movies = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const celeb_id = req.params.celeb_id;
            const pop = await popular(celeb_id);
            return res.status(200).json({pop : pop});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

const get_movie_genre = async (req, res) => {
    try{
        if (req.session.is_logged_in){
            const movie_id = req.params.movie_id;
            const genres = get_genres(movie_id)
            return res.status(200).json({genres : genres});
        }
        else return res.status(400).json({message : "Login to access the link"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Server error"});
    }
}

module.exports ={
    get_movie,
    get_movie_list,
    add_movie,
    edit_movie,
    get_top250_movies,
    get_top250_series,
    get_movie_by_genre,
    get_series_by_genre,
    get_rec,
    get_popular_movies,
    get_movie_genre
}

