const pool = require("../db");

const get_movie_details = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleid=$1;',
        [movie_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_all_movies = () =>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title order by avgrating;',
        []
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const add_title_to_db = (title_id, title_type, title, release_date, link, views, avg_rating, votecount, backdrop_link, poster_link, overview )=>{
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO title values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
        [title_id, title_type, title, release_date, link, views, avg_rating, votecount, backdrop_link, poster_link, overview ]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_top250_movie_details = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleType =\'movie\' ORDER BY avgrating LIMIT 10;',
        []
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_top250_series_details = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleType =\'TVseries\' ORDER BY avgrating LIMIT 10;',
        []
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_title_by_genre = (title_type, genre_id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM title WHERE titleid in (SELECT titleId FROM title_genre WHERE genreid=$2) AND titletype=$1;",
        [title_type,genre_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const recommend = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM title WHERE titleid IN (SELECT titleid from title_genre WHERE genreid IN (SELECT genreid FROM genre_count WHERE userid=$1 ORDER BY val DESC LIMIT 3));",
        [user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const popular = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM title INNER JOIN titlecast USING (titleid) WHERE celebid=$1;",
        [movie_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_genres = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT genrename FROM genre WHERE genreid IN (SELECT genreid FROM title_genre WHERE titleid=$1);",
        [movie_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    get_movie_details,
    get_all_movies,
    add_title_to_db,
    get_top250_movie_details,
    get_top250_series_details,
    get_title_by_genre,
    recommend,
    popular,
    get_genres
}
