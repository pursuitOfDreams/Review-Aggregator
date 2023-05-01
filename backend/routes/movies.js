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
    get_popular_movies,
    get_movie_genre
} = require("../controllers/movies");

movie_router.get("/", get_movie_list);
movie_router.get("/:movie_id", get_movie);
movie_router.post("/movie_add/add", add_movie);
movie_router.put("/movie_edit/edit", edit_movie);
movie_router.get("/top/top250", get_top250_movies);
movie_router.get("/genre/:genre_id", get_movie_by_genre);
movie_router.get("/tvseries/top250", get_top250_series);
movie_router.get("/tvseries/genre/:genre_value", get_series_by_genre);
movie_router.get("/movie/recommended", get_rec);
movie_router.get("/celebrity/:celeb_id", get_popular_movies);
movie_router.get("/get_genre/:movie_id", get_movie_genre);

module.exports = {movie_router};
