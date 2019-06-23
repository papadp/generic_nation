#! /bin/bash

sudo docker-compose down -v
sudo docker-compose up -d postgres

curl 127.0.0.1:5432
while [ $? -ne 52 ]

    do
        echo "[RESET_DB] Waiting for postgres..."
        sleep 3
        curl 127.0.0.1:5432
    done

sudo docker-compose run --rm generic_nation python3 /data/reset_db.py
