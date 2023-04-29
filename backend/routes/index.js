const express = require("express");
const router = express.Router();
const { auth_router, user_router } = require("./users");
const { movie_router } = require("./movies");
const { celeb_router } = require("./movies");
const { check_auth } = require("../controllers/users");

router.use('/auth', (req, res, next) => {
    next()
}, auth_router);

router.use('/user', check_auth(), user_router);
router.use('/celebrities', check_auth(), celeb_router);
router.use('/movies',check_auth(), movie_router);

module.exports = router;
