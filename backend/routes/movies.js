const express = require("express");
const router = express.Router();
const {
    get_movie,
    get_movie_list,
    add_movie,
    edit_movie,
    get_top250_movies,
    get_top250_series,
    get_movie_by_genre,
    get_series_by_genre
} = require("../controllers/movies");

router.get("/", get_movie_list);
router.get("/:movie_id", get_movie);
router.post("/add", add_movie);
router.put("/edit", edit_movie);
router.get("/top250", get_top250_movies);
router.get("/genre", get_movie_by_genre);
router.get("/tvseries/top250", get_top250_series);
router.get("/tvseries/genre", get_series_by_genre);

module.exports = router;
