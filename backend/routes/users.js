const express = require("express");
const auth_router = express.Router();
const user_router = express.Router();
const { login_user, signup_user, logout, get_watchlist, get_reviews, add_watchlist, delete_watchlist, update_count, in_watchlist } = require("../controllers/users");


auth_router.post('/login', login_user);
auth_router.post('/signup', signup_user);
auth_router.get('/logout', logout);
user_router.get('/watchlist', get_watchlist);
user_router.get('/watchlist/add/:movie_id', add_watchlist);
user_router.get('/watchlist/delete/:movie_id', delete_watchlist);
user_router.get('/watchlist/:movie_id', in_watchlist);
user_router.get('/reviews/:user_id', get_reviews);
user_router.get('/visit/:movie_id', update_count);

module.exports = {
    auth_router,
    user_router
}
