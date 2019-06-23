import logging

from flask import jsonify

from generic_nation.app import app, db
from flask_apispec import use_kwargs, marshal_with
from marshmallow import fields

from generic_nation.db.nation import Nation
from generic_nation.db.order import Order
from generic_nation.schemas import NationSchema


@app.route("/api/nations", methods=["GET"])
@marshal_with(NationSchema(many=True))
def get_nations():
    nations = db.session.query(Nation).all()

    for nation in nations:
        logging.error(nation.name)
        logging.error(nation.columns)

    return nations


@app.route("/api/nations/<int:id>", methods=["GET"])
@marshal_with(NationSchema)
def get_nation_by_id(id):
    nation = db.session.query(Nation).filter(Nation.id == id).first()

    logging.error(nation.id)
    logging.error(nation.name)

    return nation


@app.route("/api/nations", methods=["POST"])
@use_kwargs({
    "name": fields.String(required=True),
    "columns": fields.List(fields.Dict(), required=True)
})
def post_nations(name, columns):
    logging.error("CREATE NATION")

    n = Nation(name, columns)

    db.session.add(n)
    db.session.commit()

    return "OK", 200


@app.route("/api/nations/<int:id>", methods=["DELETE"])
def delete_nations(id):
    nation = db.session.query(Nation).filter(Nation.id == id).first()

    db.session.delete(nation)
    db.session.commit()

    logging.error("RUHAMA DELETE NATION ID: %s" % id)
    return "OK", 200


@app.route("/api/nations/<int:id>", methods=["PUT"])
@use_kwargs({
    "name": fields.String(required=False),
    "columns": fields.List(fields.Dict(), required=False)
})
def put_nation_by_id(id, name="", columns=None):
    nation = db.session.query(Nation).filter(Nation.id == id).first()

    logging.error(nation.id)

    if name:
        nation.name = name
        logging.error(nation.name)
    if columns:
        nation.columns = columns
        logging.error(nation.columns)

    nation.reset_order()
    db.session.commit()

    return "OK", 200

@app.route("/api/order/<int:nation_id>", methods=["GET"])
@marshal_with(
    {
        'nation': fields.Nested(NationSchema, required=True),
        'rows': fields.List(fields.Dict(), missing=[])
    }
)
def get_order_by_nation_by_id(nation_id):
    nation = db.session.query(Nation).filter(Nation.id == nation_id).first()

    order_dict = {
        "nation": NationSchema().dump(nation),
        "rows": nation.order.rows
    }

    logging.error(order_dict)

    return jsonify(order_dict)


@app.after_request
def allow_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Request-Headers"] = "*"
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
