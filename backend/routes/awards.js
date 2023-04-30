const express = require("express");
const awards_router = express.Router();
const {
    get_award,
    post_award,
    get_award_celeb,
    post_award_celeb,
    all_awards,
    get_individual_awards
} = require("../controllers/awards");

awards_router.get("/", all_awards);
awards_router.get("/movie", get_award);
awards_router.post("/movie", post_award);
awards_router.get("/celebrity", get_award_celeb);
awards_router.post("/celebrity", post_award_celeb);
awards_router.get("/individual", get_individual_awards);

module.exports = { awards_router };
