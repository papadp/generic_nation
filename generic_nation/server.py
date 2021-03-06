import logging
import os

import slack
from flask import jsonify

from generic_nation.app import app, db
from flask_apispec import use_kwargs, marshal_with
from marshmallow import fields

from generic_nation.consts import MenuColumnType
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
    "name": fields.String(missing=''),
    "columns": fields.List(fields.Dict(), missing=[]),
})
def put_nation_by_id(id, name, columns):
    nation = db.session.query(Nation).filter(Nation.id == id).first()

    logging.error(nation.id)

    if name:
        nation.name = name
        logging.error(nation.name)

    if columns:
        nation.columns = columns
        nation.reset_order()
        logging.error("HERE ARE THE ROWS %s", nation.order.rows)
        logging.error(nation.columns)

    db.session.commit()

    return "OK", 200


@app.route("/api/order/<int:nation_id>", methods=["GET"])
@marshal_with(
    {
        'nation': fields.Nested(NationSchema, required=True),
        'rows': fields.List(fields.Dict(), missing=[]),
        'chat': fields.List(fields.Dict(), missing=[])
    }
)
def get_order_by_nation_by_id(nation_id):
    nation = db.session.query(Nation).filter(Nation.id == nation_id).first()


    returned_rows = []
    column_aggregations = []

    for column in nation.columns:
        if column["type"] == MenuColumnType.MULTI.name:

            aggregation = {}

            for option in column["options"]:
                aggregation[option["name"]] = {"amount": 0, "price": 0}
                aggregation['type'] = column["type"]

            column_aggregations.append(aggregation)

        if column["type"] == MenuColumnType.INT.name or column["type"] == MenuColumnType.BOOL.name:
            column_aggregations.append({"amount": 0, "price": 0, 'type': column["type"]})

    for row in nation.order.rows:

        new_row = row
        total_price = 0

        for n, value in enumerate(row['values']):
            # column = nation.columns[n]

            logging.error(n)

            column_aggregations[n]['name'] = nation.columns[n]['name']

            if nation.columns[n]["type"] == MenuColumnType.BOOL.name:
                if value == True:
                    total_price += nation.columns[n]["price"]

                    column_aggregations[n]["amount"] += 1
                    column_aggregations[n]["price"] += nation.columns[n]["price"]

            elif nation.columns[n]["type"] == MenuColumnType.INT.name:
                price = (value * nation.columns[n]["price"])
                total_price += price

                column_aggregations[n]["price"] += price
                column_aggregations[n]["amount"] += value

            elif nation.columns[n]["type"] == MenuColumnType.MULTI.name:

                for option in nation.columns[n]['options']:
                    if option["name"] == value:
                        total_price += option["price"]

                        column_aggregations[n][value]["price"] += option["price"]
                        column_aggregations[n][value]["amount"] += 1

            new_row["price"] = total_price

        returned_rows.append(new_row)

        logging.error(row)

    order_dict = {
        "nation": NationSchema().dump(nation)[0],
        "rows": returned_rows,
        'chat': nation.get_chat_data(),
        "columns": column_aggregations
    }

    logging.error(order_dict)

    return jsonify(order_dict)


@app.route("/api/order/<int:nation_id>", methods=["PUT"])
@use_kwargs(
    {
        'rows': fields.List(fields.Dict(), missing=[], required=False)
    }
)
def put_order_by_nation_by_id(nation_id, rows):
    nation = db.session.query(Nation).filter(Nation.id == nation_id).first()
    nation.order.rows = rows

    logging.error(rows)
    db.session.commit()

    return "OK", 200


@app.route("/api/output/<int:nation_id>", methods=["GET"])
@marshal_with(
    {
        'rows': fields.List(fields.Dict(), missing=[]),
        'columns': fields.List(fields.Dict(), missing=[])
    }
)
def get_output_by_nation_id(nation_id):
    nation = db.session.query(Nation).filter(Nation.id == nation_id).first()

    returned_rows = []
    column_aggregations = []

    for column in nation.columns:
        if column["type"] == MenuColumnType.MULTI.name:

            aggregation = {}

            for option in column["options"]:
                aggregation[option["name"]] = {"amount": 0, "price": 0}
                aggregation['type'] = column["type"]

            column_aggregations.append(aggregation)

        if column["type"] == MenuColumnType.INT.name or column["type"] == MenuColumnType.BOOL.name:
            column_aggregations.append({"amount": 0, "price": 0, 'type': column["type"]})

    for row in nation.order.rows:

        new_row = row
        total_price = 0

        for n, value in enumerate(row['values']):
            # column = nation.columns[n]

            logging.error(n)

            column_aggregations[n]['name'] = nation.columns[n]['name']

            if nation.columns[n]["type"] == MenuColumnType.BOOL.name:
                if value == True:
                    total_price += nation.columns[n]["price"]

                    column_aggregations[n]["amount"] += 1
                    column_aggregations[n]["price"] += nation.columns[n]["price"]

            elif nation.columns[n]["type"] == MenuColumnType.INT.name:
                price = (value * nation.columns[n]["price"])
                total_price += price

                column_aggregations[n]["price"] += price
                column_aggregations[n]["amount"] += value

            elif nation.columns[n]["type"] == MenuColumnType.MULTI.name:

                for option in nation.columns[n]['options']:
                    if option["name"] == value:
                        total_price += option["price"]

                        column_aggregations[n][value]["price"] += option["price"]
                        column_aggregations[n][value]["amount"] += 1

            new_row["price"] = total_price

        returned_rows.append(new_row)

        logging.error(row)

    order_dict = {
        "rows": returned_rows,
        "columns": column_aggregations
    }

    logging.error(order_dict)

    return jsonify(order_dict)


@app.route("/api/chat/<int:nation_id>", methods=["POST"])
@use_kwargs(
    {
        'user': fields.String(required=True),
        'message': fields.String(required=True)
    }
)
def post_chat(nation_id, user, message):
    nation = db.session.query(Nation).filter(Nation.id == nation_id).first()

    nation.add_message(user, message)


@app.route("/api/slack/msg", methods=["POST"])
@use_kwargs(
    {
        "msg": fields.String(required=True)
    }
)
def send_msg_to_slack(msg):
    logging.error(" slack response: " + os.getenv("SLACK_KEY"))
    client = slack.WebClient(token=os.getenv("SLACK_KEY"))

    client.chat_postMessage(
        channel='CKML2K28H',
        text=msg)

    return "OK", 200


@app.after_request
def allow_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Request-Headers"] = "*"
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
