import argparse, psycopg2, sys
from psycopg2.extras import execute_values
import csv
import sys
import json



def main(args):
    connection = psycopg2.connect(host = "localhost", port = "5432", database = "dbis_project", user = "postgres", password = "1234")
    cursor = connection.cursor()

    with open("trending_movie.json", 'r') as f:
        data = json.load(f)

    values =  []
    api = "https://api.themoviedb.org/3/trending/movie/day?api_key=5db95b8fefe73bdb564f6c4f03c46d72"
    ########################### Movie ############################
    for entry in data["results"]:
        values.append(tuple([entry["id"], "movie", entry["title"], entry["release_date"], "", 0 , entry["vote_average"], entry["vote_count"], entry["backdrop_path"],entry["poster_path"], entry["overview"]]))
    query = "INSERT INTO title VALUES %s"
    execute_values(cursor, query, values)
    connection.commit()

    ########################### Genre ############################
    with open("genre.json", 'r') as f:
        data = json.load(f)

    values = []
    for genre in data["genres"]:
        values.append(tuple([genre["id"], genre["name"]]))

    query = "INSERT INTO genre VALUES %s"
    execute_values(cursor, query, values)
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
        values.append(tuple([entry["id"], "tv", entry["name"], entry["first_air_date"], "", 0 , entry["vote_average"], entry["vote_count"], entry["backdrop_path"],entry["poster_path"], entry["overview"]]))
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
    parser.add_argument("--name")
    parser.add_argument("--user")
    parser.add_argument("--pswd")
    parser.add_argument("--host")
    parser.add_argument("--port")
    parser.add_argument("--import-table-data", action='store_true')
    parser.add_argument("--export-table-data", action='store_true')
    parser.add_argument("--show-tables", action='store_true')
    parser.add_argument("--show-table-schema", action='store_true')
    parser.add_argument("--table")
    parser.add_argument("--format")
    parser.add_argument("--import-sql", action='store_true')
    parser.add_argument("--path")
    parser.add_argument("--export-database-schema", action='store_true')
    parser.add_argument("--testing", action = 'store_true')

    args = parser.parse_args()
    main(args)
