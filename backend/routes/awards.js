const express = require("express");
const router = express.Router();
const {
    get_award,
    post_award,
    get_award_celeb,
    post_award_celeb,
    all_awards
} = require("../controllers/awards");

router.get("/", all_awards);
router.get("/movie", get_award);
router.post("/movie", post_award);
router.get("/celebrity", get_award_celeb);
router.post("/celebrity", post_award_celeb);

module.exports = router;
