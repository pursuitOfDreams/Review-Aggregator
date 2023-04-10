DROP TABLE IF EXISTS Watchlist;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS celebAwards;
DROP TABLE IF EXISTS Awards;
DROP TABLE IF EXISTS titleCast;
DROP TABLE IF EXISTS Celebrities;
DROP TABLE IF EXISTS Title;
DROP TABLE IF EXISTS viewer;

CREATE TABLE viewer(
    user_id varchar(255),
    user_name varchar(255), 
    user_password varchar, 
    genre_count int Array[24],
    priorityLevel int, 
    PRIMARY KEY(user_id)
);
CREATE TABLE Title(
    title_id SERIAL, 
    title_type varchar(10), 
    title varchar(255), 
    start_year char(4), 
    end_year char(4), 
    runtime_minutes int, 
    genres varchar(255), 
    link varchar(255), 
    views int, 
    avg_rating numeric(4,2), 
    PRIMARY KEY(title_id)
);
CREATE TABLE Celebrities(
    celeb_id int, 
    primary_name varchar(255), 
    birth_year char(4), 
    death_year char(4), 
    primary_profession varchar(20), 
    intro varchar, 
    user_id varchar(255), 
    PRIMARY KEY(celeb_id), 
    FOREIGN KEY(user_id) REFERENCES viewer(user_id)
);
CREATE TABLE titleCast(
    title_id int, 
    celeb_id int, 
    role_type varchar(20), 
    role_name varchar(255), 
    PRIMARY KEY(title_id, celeb_id, role_type, role_name), 
    FOREIGN KEY(title_id) REFERENCES Title(title_id), 
    FOREIGN KEY(celeb_id) REFERENCES Celebrities(celeb_id)
);
CREATE TABLE Awards(
    award_id int, 
    award_name varchar(20), 
    category varchar(60), 
    year char(4), 
    title_id int, 
    PRIMARY KEY(award_id), 
    FOREIGN KEY(title_id) REFERENCES Title(title_id)
);
CREATE TABLE celebAwards(
    celeb_id int, 
    award_id int, 
    PRIMARY KEY(celeb_id, award_id), 
    FOREIGN KEY(celeb_id) REFERENCES Celebrities(celeb_id), 
    FOREIGN KEY(award_id) REFERENCES Awards(award_id)
);
CREATE TABLE Reviews(
    title_id int, 
    user_id varchar(255), 
    review_text varchar, 
    rating int, 
    PRIMARY KEY(title_id, user_id), 
    FOREIGN KEY (title_id) REFERENCES Title(title_id), 
    FOREIGN KEY(user_id) REFERENCES viewer(user_id)
);
CREATE TABLE Watchlist(
    title_id int, 
    user_id varchar, 
    PRIMARY KEY(title_id, user_id), 
    FOREIGN KEY(title_id) REFERENCES Title(title_id), 
    FOREIGN KEY(user_id) REFERENCES viewer(user_id)
);
