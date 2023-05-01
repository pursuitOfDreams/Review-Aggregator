DROP TABLE IF EXISTS Watchlist;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS celebAwards;
DROP TABLE IF EXISTS Awards;
DROP TABLE IF EXISTS titleCast;
DROP TABLE IF EXISTS title_genre;
DROP TABLE IF EXISTS Celebrities;
DROP TABLE IF EXISTS Title;
DROP TABLE IF EXISTS genre_count;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS viewer;

CREATE TABLE viewer(
    userId varchar(255),
    user_name varchar(255), 
    user_password varchar(255), 
    PRIMARY KEY(userId),  
    priorityLevel int
);

CREATE TABLE Title(
    titleId int, 
    titleType varchar(10), 
    title varchar(255), 
    release_date date, 
    -- RuntimeMinutes int, 
    link varchar(255), 
    views int, 
    avgRating numeric(4,2), 
    voteCount int, 
    backdrop_link varchar,
    poster_link varchar,
    overview varchar,
    PRIMARY KEY(titleId)
);
CREATE TABLE Celebrities(
    celebId SERIAL, 
    primaryName varchar(255), 
    birthYear date, 
    deathYear date, 
    primaryProfession varchar(20), 
    Intro varchar, 
    userId varchar(255), 
    photo_link varchar,
    PRIMARY KEY(celebId), 
    FOREIGN KEY(userId) REFERENCES viewer(userId)
);

CREATE TABLE titleCast(
    titleId int, 
    celebId int, 
    roleType varchar(20), 
    roleName varchar(255), 
    PRIMARY KEY(titleId, celebId, roleType, roleName), 
    FOREIGN KEY(titleId) REFERENCES Title(titleId), 
    FOREIGN KEY(celebId) REFERENCES Celebrities(celebId)
);
CREATE TABLE Awards(
    awardId SERIAL, 
    award_name varchar(20), 
    category varchar(60), 
    year char(4), 
    titleId int, 
    PRIMARY KEY(awardId), 
    FOREIGN KEY(titleId) REFERENCES Title(titleId)
);

CREATE TABLE celebAwards(
    celebId int, 
    awardId int, 
    PRIMARY KEY(celebId, awardId), 
    FOREIGN KEY(celebId) REFERENCES Celebrities(celebId), 
    FOREIGN KEY(awardId) REFERENCES Awards(awardId)
);
CREATE TABLE Reviews(
    titleId int,
    userId varchar(255), 
    reviewText varchar, 
    rating int, 
    PRIMARY KEY(titleId, userId), 
    FOREIGN KEY (titleId) REFERENCES Title(titleId), 
    FOREIGN KEY(userId) REFERENCES viewer(userId)
);
CREATE TABLE Watchlist(
    titleId int, 
    userId varchar, 
    PRIMARY KEY(titleId, userId), 
    FOREIGN KEY(titleId) REFERENCES Title(titleId), 
    FOREIGN KEY(userId) REFERENCES viewer(userId)
);

CREATE TABLE Genre(
    genreId int,
    genreName varchar,
    PRIMARY KEY(genreId)
);
CREATE TABLE genre_count(
    userid varchar(255),
    genreId int,
    val int,
    PRIMARY KEY(userid, genreId),
    FOREIGN KEY(userid) REFERENCES viewer(userid),
    FOREIGN KEY(genreId) REFERENCES Genre(genreId)
);
CREATE TABLE title_genre(
    titleId int,
    genreId int,
    PRIMARY KEY(titleId, genreId),
    FOREIGN KEY(titleId) REFERENCES Title(titleId),
    FOREIGN KEY(genreId) REFERENCES Genre(genreId)
);



