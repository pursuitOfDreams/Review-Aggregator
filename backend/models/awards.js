const pool = require("../db");

const get_movie_awards = (award_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleid in (SELECT titleid FROM awards WHERE awardid=$1);',[award_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const is_movie = (movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM title WHERE titleid=$1;',[movie_id]
        , (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const post_movie_award = (award_name, award_cat, year, movie_id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO awards values($1, $2, $3, $4);',
        [award_name, award_cat, year, movie_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const get_celeb_award_id = (celeb_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from awards WHERE awardid IN (SELECT awardid FROM celebawards WHERE celebid=$1);',
        [celeb_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const is_award = (award_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM awards WHERE awardid = $1;',
        [award_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const is_celeb = (celeb_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM celebrities WHERE celebid = $1;',
        [celeb_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const add_award_celeb = (award_id, celeb_id) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO celebawards values($1, $2)',
        [celeb_id, award_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const get_all_awards = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM awards;',
        [], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const indiv_awards = (award_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM celebrities WHERE celebid IN (SELECT celebid FROM celebawards WHERE awardid=$1);',
        [award_id], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const year_awards = (year) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM awards WHERE year=$1;',
        [year], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

const type_awards = (type) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM awards WHERE award_name=$1;',
        [type], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        })
    })
}

module.exports = {
    get_movie_awards,
    is_movie,
    post_movie_award,
    get_celeb_award_id,
    is_award,
    is_celeb,
    add_award_celeb,
    get_all_awards,
    indiv_awards,
    year_awards,
    type_awards
}
