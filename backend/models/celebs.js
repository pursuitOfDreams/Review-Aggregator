const pool = require("../db");

const get_celeb_details = (celeb_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM celebrities WHERE celeb_id=$1;',
        [celeb_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const add_celeb_detail = (primaryName, birthYear, deathYear, primaryProfession, Intro, userId) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO VALUES Celebrities(primaryName, birthYear, deathYear, primaryProfession, Intro, userId ) VALUES ($1,$2,$3,$4,$5,$6);',
        [primaryName, birthYear, deathYear, primaryProfession, Intro, userId]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const is_celeb = (user_id, celeb_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT userid FROM celebrities WHERE userid=$1 AND celebid=$2;',
        [user_id, celeb_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })

}

const update_celeb_detail = (celebId, primaryName, birthYear, deathYear, primaryProfession, Intro, userId) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE Celebrities SET primaryName = $1, birthYear= $2, deathYear=$3, primaryProfession=$4, Intro=$5, userId=$6 WHERE celebId = $7;',
        [primaryName, birthYear, deathYear, primaryProfession, Intro, userId, celebId]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const get_movie_celebs = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM titlecast WHERE titleid=$1;',
        [movie_id]
        , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

module.exports ={
    get_celeb_details,
    add_celeb_detail,
    is_celeb,
    update_celeb_detail,
    get_movie_celebs
}
