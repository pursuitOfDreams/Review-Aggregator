const express = require("express");
const router = express.Router();
const {
    get_celeb_info,
    post_celeb_info,
    edit_celeb_info
} = require("../controllers/celebs");

router.get("/celeb", get_celeb_info);
router.post("/celeb", post_celeb_info);
router.put("/celeb", edit_celeb_info);
router.get("/celeb/movies", get_movie_celeb_info);

module.exports = router;
