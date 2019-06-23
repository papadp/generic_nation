import logging

from generic_nation.app import app, db
from flask_apispec import use_kwargs, marshal_with
from marshmallow import fields

from generic_nation.db.nation import Nation
from generic_nation.schemas import NationSchema


@app.route("/api/nations", methods=["GET"])
@marshal_with(NationSchema(many=True))
def get_nations():
    nations = db.session.query(Nation).all()

    for nation in nations:
        logging.error(nation.name)
        logging.error(nation.columns)

    return nations


@app.route("/api/nations", methods=["POST"])
@use_kwargs({
    "name": fields.String(required=True),
    "columns": fields.List(fields.Dict(), required=True)
})
def nations(name, columns):
    logging.error("CREATE NATION")

    n = Nation(name, columns)

    db.session.add(n)
    db.session.commit()

    return "OK", 200


@app.route("/api/nations", methods=["DELETE"])
@use_kwargs({
    "id": fields.Integer(required=True)
})
def nations(id):
    n = db.session.query.filter_by(id=id).first()

    db.session.delete(n)
    db.session.commit()

    logging.error("RUHAMA DELETE NATION ID: %s" % id)
    return "OK", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
