const pool = require("../db");

const user_reviews = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reviews WHERE userid=$1;',
        [user_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}


module.exports = {
    user_reviews
}
