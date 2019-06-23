from flask import Flask
from flask_apispec import FlaskApiSpec
from flask_apispec.extension import APISpec
from flask_sqlalchemy import SQLAlchemy

app = Flask("generic_nation_api")

app.config.update({
    'APISPEC_SPEC':
        APISpec(
            title='Generic Nation Api',
            version='v1',
            plugins=('apispec.ext.marshmallow',))
})

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password_123456@postgres/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

app_docs = FlaskApiSpec(app)

