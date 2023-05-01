import argparse, psycopg2, sys
from psycopg2.extras import execute_values
import csv
import sys
import json
import requests
from tqdm import tqdm


def main(args):
    connection = psycopg2.connect(host = "localhost", port = "5432", database = "dbis_project", user = "postgres", password = "1234")
    cursor = connection.cursor()

    cursor.execute(open("schema.sql", "r").read())

    ########################### Inserting Reviews ############################
    title_ids = []
    with open("trending_movie.json",'r') as f:
        data = json.load(f)
    
    for entry in data["results"]:
        title_ids.append(entry["id"])

    with open("trending_tv.json",'r') as f:
        data = json.load(f)
    
    for entry in data["results"]:
        title_ids.append(entry["id"])

    celebs = []
    titleCast = []
    print(40*"="," iserting Celebs ", 40*"=")
    for movie_id in tqdm(title_ids):
        movie_cast_api = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=5db95b8fefe73bdb564f6c4f03c46d72&language=en-US"
        res = requests.get(movie_cast_api)
        casts = res.json()["cast"]
        for cast in tqdm(casts):
            cast_id = cast["id"]
            cast_api = f"https://api.themoviedb.org/3/person/{cast_id}?api_key=5db95b8fefe73bdb564f6c4f03c46d72&language=en-US"
            res = requests.get(cast_api)
            data = res.json()
            celebs.append({
                            "celeb id" : cast["id"],
                            "primaryName" : cast["name"],
                            "birthYear" : data["birthday"],
                            "deathYear" : data["deathday"],
                            "primaryProfession" : "acting",
                            "Intro" : data["biography"],
                            "userId" : None,
                            "photo_link" : cast["profile_path"]
                        })
            titleCast.append({
                "titleId" : movie_id,
                "celebId" : cast["id"],
                "roleType": cast["known_for_department"],
                "roleName": cast["character"]
            })

    with open("celebs1.json", 'w') as f:
        json.dump(celebs, f)

    with open("titleCast1.json", 'w') as f:
        json.dump(titleCast, f)
    
    print("done")
    if connection:
        cursor.close()
        connection.close()
    

        

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    
    args = parser.parse_args()
    main(args)
