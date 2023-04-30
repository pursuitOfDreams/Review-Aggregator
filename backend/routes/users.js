const express = require("express");
const auth_router = express.Router();
const user_router = express.Router();
const { login_user, signup_user, logout, get_watchlist, get_reviews, add_watchlist, delete_watchlist, update_count } = require("../controllers/users");


auth_router.post('/login', login_user);
auth_router.post('/signup', signup_user);
auth_router.get('/logout', logout);
user_router.get('/watchlist', get_watchlist);
user_router.get('/watchlist/add', add_watchlist);
user_router.get('/watchlist/delete', delete_watchlist);
user_router.get('/reviews', get_reviews);
user_router.get('/visit', update_count);

module.exports = {
    auth_router,
    user_router
}
