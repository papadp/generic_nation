from marshmallow import Schema, fields, pre_dump, post_dump, post_load, pre_load
from marshmallow.exceptions import ValidationError
from marshmallow_enum import EnumField

class NationSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    columns = fields.List(fields.Dict(), missing=[])

    # This is for the use of 'webargs' lib. more info - https://webargs.readthedocs.io/en/latest/advanced.html?highlight=schema
    class Meta:
        strict = True
