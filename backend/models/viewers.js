const pool = require("../db");

const get_user_cred = (user_id) =>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM viewer WHERE user_id = $1;',
        [user_id],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insert_user = (user_id, user_name, user_password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO viewer values ($1, $2, $3, array_fill(0, ARRAY[24]), 0);',
        [user_id, user_name, user_password]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    get_user_cred,
    insert_user
}
