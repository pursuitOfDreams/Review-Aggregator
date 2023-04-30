const pool = require("../db");

const get_rev = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reviews WHERE titleid=$1 SORT BY rating;',
        [movie_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const has_posted = (user_id, movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reviews WHERE titleid=$1 AND userid=$2;',
        [movie_id, user_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const rem_post = (user_id, movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM reviews WHERE titleid=$1 AND userid=$2;',
        [movie_id,user_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const update_rating = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE title SET avgrating=(SELECT avg(rating) FROM reviews GROUP BY titleid HAVING titleid=$1) WHERE titleid=$1;',
        [movie_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const post_rev = (movie_id, user_id, reviewtext, rating) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO reviews values($1,$2,$3,$4);',
        [movie_id,user_id,reviewtext,rating]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const get_single_review = (user_id, movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reviews WHERE userid=$1 AND titleid=$2',
        [user_id,movie_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    get_rev,
    has_posted,
    rem_post,
    update_rating,
    post_rev,
    get_single_review
}
