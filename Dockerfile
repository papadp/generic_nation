FROM python:3.6

RUN apt-get update

RUN apt-get install -y curl

RUN pip3 install flask==1.0.2\
                apispec==0.25.4\
                flask-apispec==0.4.2\
                sqlalchemy\
                flask-sqlalchemy==2.3.2\
                webargs==1.8.1\
                marshmallow==2.13.3\
                marshmallow-enum==1.0\
                psycopg2==2.7.1
