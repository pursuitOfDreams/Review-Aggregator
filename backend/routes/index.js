const express = require("express");
const router = express.Router();
const { auth_router, user_router } = require("./users");

router.use('/auth', (req, res, next) => {
    next()
}, auth_router);

router.use('/user', (req, res, next) => {
    next()
}, user_router);

module.exports = router;
