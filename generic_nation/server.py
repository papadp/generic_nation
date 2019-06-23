from flask import app
from flask_apispec import use_kwargs
from marshmallow import fields


@app.route("/nations", methods=["GET", "POST", "PUT", "DELETE"])
@use_kwargs({
    "id": fields.Int(required=False, missing=None),
    "name": fields.String(required=False, missing=None),
    "columns": fields.List(required=False, missing=None)
})
def nations(id, name, columns):
    pass



