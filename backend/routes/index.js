const express = require("express");
const router = express.Router();
const authRouter = require("./users");

router.use('/auth', (req, res, next) => {
    next()
}, authRouter);

module.exports = router;