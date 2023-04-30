const express = require("express");
const router = express.Router();
const { auth_router, user_router } = require("./users");
const { movie_router } = require("./movies");
const { celeb_router } = require("./celebs");
const { awards_router } = require("./awards");
const { reviews_router } = require("./reviews");
const { check_auth } = require("../controllers/users");

router.use('/auth', (req, res, next) => {
    next()
}, auth_router);

router.use('/user', (req, res, next) => { next() }, user_router);
router.use('/celebrities', (req, res, next) => { next() }, celeb_router);
router.use('/movies',(req, res, next) => {next()}, movie_router);
router.use('/awards', (req, res, next) => {next()}, awards_router);
router.use('/reviews', (req,res,next) => {next()}, reviews_router);

module.exports = router;
