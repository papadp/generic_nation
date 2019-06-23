import logging

from generic_nation.app import app, db
from flask_apispec import use_kwargs
from marshmallow import fields

from generic_nation.db.nation import Nation


@app.route("/api/nations", methods=["GET"])
@use_kwargs({
    "name": fields.String(required=True),
})
def nations(name):
    logging.error("HEY IM HERE")

    n = Nation(name, [])

    db.session.add(n)
    db.session.commit()

    return "OK", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
