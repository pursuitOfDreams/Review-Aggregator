const express = require("express");
const movie_router = express.Router();
const {
    get_movie,
    get_movie_list,
    add_movie,
    edit_movie,
    get_top250_movies,
    get_top250_series,
    get_movie_by_genre,
    get_series_by_genre,
    get_rec,
    get_popular_movies
} = require("../controllers/movies");

movie_router.get("/", get_movie_list);
movie_router.get("/:movie_id", get_movie);
movie_router.post("/add", add_movie);
movie_router.put("/edit", edit_movie);
movie_router.get("/top250", get_top250_movies);
movie_router.get("/genre/:genre_id", get_movie_by_genre);
movie_router.get("/tvseries/top250", get_top250_series);
movie_router.get("/tvseries/genre/:genre_id", get_series_by_genre);
movie_router.get("/recommended", get_rec);
movie_router.get("/celebrity/:celeb_id", get_popular_movies);

module.exports = {movie_router};
