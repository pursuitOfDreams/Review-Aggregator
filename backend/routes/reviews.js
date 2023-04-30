const express = require("express");
const router = express.Router();
const {
    get_movie_reviews,
    post_movie_reviews,
    get_review
} = require("../controllers/reviews");

router.get("/movie/", get_movie_reviews);
router.post("/movie", post_movie_reviews);
router.post("/user", get_review);

module.exports = { reviews_router : router };
