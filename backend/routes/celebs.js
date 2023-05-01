const express = require("express");
const celeb_router = express.Router();
const {
    get_celeb_info,
    post_celeb_info,
    put_celeb_info,
    get_movie_celeb_info,
    get_celeb_list
} = require("../controllers/celebs");

celeb_router.get("/celeb/:celeb_id", get_celeb_info);
celeb_router.post("/celeb", post_celeb_info);
celeb_router.put("/celeb", put_celeb_info);
celeb_router.get("/celeb/movies/:movie_id", get_movie_celeb_info);
celeb_router.get("/celebs/list", get_celeb_list);

module.exports = { celeb_router };
