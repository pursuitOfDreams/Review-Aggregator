import argparse, psycopg2, sys
from psycopg2.extras import execute_values
import csv
import sys
import json
import requests


def main(args):
    connection = psycopg2.connect(host = "localhost", port = "5432", database = "dbis_project", user = "postgres", password = "1234")
    cursor = connection.cursor()

    cursor.execute(open("schema.sql", "r").read())
    
    with open("trending_movie.json", 'r') as f:
        data = json.load(f)

    values =  []
    api = "https://api.themoviedb.org/3/trending/movie/day?api_key=5db95b8fefe73bdb564f6c4f03c46d72"
    movie_id = ""
    get_movie_link_api = f"https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key="
    ########################### Movie ############################
    for entry in data["results"]:
        values.append(tuple([entry["id"], "movie", entry["title"], entry["release_date"], entry["video"], 0 , entry["vote_average"], entry["vote_count"], entry["backdrop_path"],entry["poster_path"], entry["overview"]]))
    query = "INSERT INTO title VALUES %s"
    execute_values(cursor, query, values)
    connection.commit()

    ########################### Genre ############################
    with open("movie_genre.json", 'r') as f:
        data = json.load(f)

    values = set()
    for genre in data["genres"]:
        values.add(tuple([genre["id"], genre["name"]]))

    with open("tv_genre.json", 'r') as f:
        data = json.load(f)

    for genre in data["genres"]:
        values.add(tuple([genre["id"], genre["name"]]))


    query = "INSERT INTO genre VALUES %s"
    execute_values(cursor, query, list(values))
    connection.commit()

    ########################### Movies Genre ############################
    with open("trending_movie.json", 'r') as f:
        data = json.load(f)

    values = [] 
    for entry in data["results"]:
        movieId = entry["id"]
        genre_ids = entry["genre_ids"]
        for id in genre_ids:
            values.append(tuple([movieId, id]))

    query = "INSERT INTO title_genre VALUES %s"
    execute_values(cursor, query, values)
    connection.commit()


    values = []
    ########################### TV ############################
    with open("trending_tvs.json", 'r', encoding='utf-8') as f:
        data = json.load(f)
   
    for entry in data["results"]:
        values.append(tuple([entry["id"], "tv", entry["name"], entry["first_air_date"], entry["video"], 0 , entry["vote_average"], entry["vote_count"], entry["backdrop_path"],entry["poster_path"], entry["overview"]]))
    query = "INSERT INTO title VALUES %s"
    execute_values(cursor, query, values)
    connection.commit()
    
    values =[]
    ########################### TV genre ############################
    with open("trending_tvs.json", 'r', encoding='utf-8') as f:
        data = json.load(f)

    values = [] 
    for entry in data["results"]:
        tvId = entry["id"]
        genre_ids = entry["genre_ids"]
        for id in genre_ids:
            values.append(tuple([tvId, id]))

    query = "INSERT INTO title_genre VALUES %s"
    execute_values(cursor, query, values)
    connection.commit()


    if connection:
        cursor.close()
        connection.close()
    

        

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    
    args = parser.parse_args()
    main(args)
