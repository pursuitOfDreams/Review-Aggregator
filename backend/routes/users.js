const express = require("express");
const auth_router = express.Router();
const user_router = express.Router();
const { login_user, signup_user, logout, get_watchlist, get_reviews } = require("../controllers/users");


auth_router.post('/login', login_user);
auth_router.post('/signup', signup_user);
auth_router.get('/logout', logout);
user_router.get('/watchlist', get_watchlist);
user_router.get('/reviews', get_reviews);

module.exports = {
    auth_router,
    user_router
}
