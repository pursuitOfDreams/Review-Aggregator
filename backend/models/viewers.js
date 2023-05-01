const pool = require("../db");

const get_user_cred = (user_id) =>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM viewer WHERE userid = $1;',
        [user_id],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insert_user = (user_id, user_name, user_password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO viewer values ($1, $2, $3, 0);',
        [user_id, user_name, user_password]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insert_user_genre = (user_id, user_name, user_password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO genre_count (SELECT $1,genreid,0 FROM genre);',
        [user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const count_update = (user_id, movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE genre_count SET val=val+1 WHERE genreid IN (SELECT genreid FROM title_genre WHERE titleid=$2) AND userid=$1;',
        [user_id, movie_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}


module.exports = {
    get_user_cred,
    insert_user,
    count_update,
    insert_user_genre
}
