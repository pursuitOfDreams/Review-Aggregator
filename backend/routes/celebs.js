const express = require("express");
const celeb_router = express.Router();
const {
    get_celeb_info,
    post_celeb_info,
    put_celeb_info,
    get_movie_celeb_info
} = require("../controllers/celebs");

celeb_router.get("/celeb", get_celeb_info);
celeb_router.post("/celeb", post_celeb_info);
celeb_router.put("/celeb", put_celeb_info);
celeb_router.get("/celeb/movies", get_movie_celeb_info);

module.exports = { celeb_router };
