import argparse, psycopg2, sys
from psycopg2.extras import execute_values
import csv
import sys
import json
import requests


def main(args):
    connection = psycopg2.connect(host = "localhost", port = "5432", database = "dbis_project", user = "postgres", password = "1234")
    cursor = connection.cursor()

    ########################### Movie ############################
    values = set()
    
    ids = set()
    with open("top_rated_movie.json",'r') as f:
        data = json.load(f)

    for entry in data["results"]:
        ids.add(entry["id"])
    
    with open("top_rated_tv.json",'r', encoding='utf-8') as f:
        data = json.load(f)

    for entry in data["results"]:
        ids.add(entry["id"])

    users = set()
    user_reviews = []
    for id in ids:
        try:
            review_api = f"https://api.themoviedb.org/3/movie/{id}/reviews?api_key=5db95b8fefe73bdb564f6c4f03c46d72&language=en-US"
            res = requests.get(review_api)
            reviews = res.json()

            for review in reviews["results"]:
                if (review["author"].encode('ascii', 'ignore').decode()!=""):
                    users.add(tuple([
                        review["author"].encode('ascii', 'ignore').decode(),
                        review["author"].encode('ascii', 'ignore').decode(),
                        "$2a$04$rSJiWi8dF8zwctpdc3BtsOjfCkFW7GEL/ZE7T8FfcuNEWBGXJkwaq",
                        0
                    ]))

                    user_reviews.append(tuple([
                        id,
                        review["author"].encode('ascii', 'ignore').decode(),
                        review["content"].encode('ascii', 'ignore').decode(),
                        review["author_details"]["rating"]
                    ]))
        except:
            pass

    query = "INSERT INTO viewer VALUES %s"
    execute_values(cursor, query, users)
    connection.commit()

    query = "INSERT INTO reviews VALUES %s"
    execute_values(cursor, query, user_reviews)
    connection.commit()

    if connection:
        cursor.close()
        connection.close()
    

        

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    
    args = parser.parse_args()
    main(args)
