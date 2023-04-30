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

const add_title_to_db = (title_type, title, start_year, end_year, runtime_minutes, genre, link, views, avg_rating )=>{
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO title values ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
        [title_type, title, start_year, end_year, runtime_minutes, genre, link, views, avg_rating ]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_top250_movie_details = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleType =\'movie\' ORDER BY avg_rating LIMIT 10;',
        []
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_top250_series_details = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleType =\'TVseries\' ORDER BY avg_rating LIMIT 10;',
        []
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_title_by_genre = (title_type, genres) => {
    const query = "SELECT distinct * FROM title WHERE titleType =$1 AND genres LIKE ";
    genres.forEach( (genre) => {
        query = query + "\'%"+genre+"%\' ";
    });
    query = query + ";";
    return new Promise((resolve, reject) => {
        pool.query(query,
        [title_type]
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
    get_title_by_genre
}
