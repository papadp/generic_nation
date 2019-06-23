import logging

from generic_nation.app import app, db
from flask_apispec import use_kwargs
from marshmallow import fields

from generic_nation.db.nation import Nation


@app.route("/api/nations", methods=["GET"])
@use_kwargs({
    "name": fields.String(required=True)
})
def nations():
    logging.error("HEY IM HERE")

    nations_in_db = db.session.query(Nation).all
    for n in nations_in_db:
        logging.error(n.name)

    return "OK", 200


@app.route("/api/nations", methods=["POST"])
@use_kwargs({
    "name": fields.String(required=True),
    "columns": fields.List(required=True)
})
def nations(name, columns):
    logging.error("CREATE NATION")

    n = Nation(name, columns)

    db.session.add(n)
    db.session.commit()

    return "OK", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
