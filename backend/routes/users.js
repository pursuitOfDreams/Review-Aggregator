const express = require("express");
const router = express.Router();
const { login_user, signup_user, logout } = require("../controllers/users");


router.post('/login', login_user);
router.post('/signup', signup_user)
router.get('/logout', logout);

module.exports = router;