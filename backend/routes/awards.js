const express = require("express");
const awards_router = express.Router();
const {
    get_award,
    post_award,
    get_award_celeb,
    post_award_celeb,
    all_awards,
    get_individual_awards,
    get_year_awards,
    get_type_awards
} = require("../controllers/awards");

awards_router.get("/", all_awards);
awards_router.get("/movie/:award_id", get_award);
awards_router.post("/movie", post_award);
awards_router.get("/celebrity/:celeb_id", get_award_celeb);
awards_router.post("/celebrity", post_award_celeb);
awards_router.get("/individual/:award_id", get_individual_awards);
awards_router.get("/year/:year", get_year_awards);
awards_router.get("/type/:type", get_type_awards);

module.exports = { awards_router };
