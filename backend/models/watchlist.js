const pool = require("../db");

const user_watchlist = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleid in (SELECT titleid FROM watchlist WHERE userid=$1);',
        [user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const watchlist_delete = (user_id, title_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM watchlist WHERE titleid=$2 AND userid=$1;',
        [user_id, title_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const watchlist_add = (user_id, title_id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO watchlist VALUES($1,$2);',
        [title_id,user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const watchlist_cont = (user_id, title_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM watchlist WHERE titleid=$1 AND userid=$2;',
        [title_id,user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    user_watchlist,
    watchlist_add,
    watchlist_delete,
    watchlist_cont
}
