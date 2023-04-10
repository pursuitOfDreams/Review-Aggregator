DROP TABLE IF EXISTS Watchlist;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS celebAwards;
DROP TABLE IF EXISTS Awards;
DROP TABLE IF EXISTS titleCast;
DROP TABLE IF EXISTS Celebrities;
DROP TABLE IF EXISTS Title;
DROP TABLE IF EXISTS viewer;

CREATE TABLE viewer(
    userId varchar(255),
    user_name varchar(255), 
    user_password varchar, 
    genreCount int Array[24], 
    PRIMARY KEY(userId),  
    priorityLevel int
);
CREATE TABLE Title(
    titleId SERIAL, 
    titleType varchar(10), 
    title varchar(255), 
    startYear char(4), 
    endYear char(4), 
    RuntimeMinutes int, 
    genres varchar(20), 
    link varchar(255), 
    views int, 
    avgRating numeric(4,2), 
    PRIMARY KEY(titleId)
);
CREATE TABLE Celebrities(
    celebId int, 
    primaryName varchar(255), 
    birthYear char(4), 
    deathYear char(4), 
    primaryProfession varchar(20), 
    Intro varchar, 
    userId varchar(255), 
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
    awardId int, 
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
