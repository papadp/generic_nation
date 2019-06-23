FROM python:3.6

RUN apt-get update

RUN pip3 install flask==1.0.2\
                flask-apispec==0.4.2\
                sqlalchemy\
                flask-sqlalchemy==2.3.2\
                webargs==1.8.1