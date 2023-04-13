const pool = require("../db");

const user_watchlist = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT titleid FROM watchlist WHERE userid=$1;',
        [user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    user_watchlist
}
