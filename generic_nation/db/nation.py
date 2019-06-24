import ujson
from pathlib import Path
from uuid import uuid4

from filelock import FileLock
from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship, backref

from generic_nation.db import Base
from generic_nation.db.order import Order


class Nation(Base):
    __tablename__ = 'nation'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    columns = Column(JSON, nullable=False)

    chat_file = Column(String, nullable=False)

    order_id = Column(Integer, ForeignKey('order.id'))
    order = relationship("Order", backref=backref('order', uselist=False))

    def __init__(self, name, columns):
        self.name = name
        self.columns = columns
        self.order = Order()
        self.chat_file = '/chatdata/%s.json' % uuid4()
        Path(self.chat_file).touch()

        with open(self.chat_file, 'w') as wh:
            wh.write(ujson.dumps([]))

    def reset_order(self):
        self.order.reset_order()

    def add_message(self, user, message):

        fl = FileLock('/tmp/%s.lock' % (self.id))

        with fl:
            with open(self.chat_file, "r") as rh:
                json_data = ujson.loads(rh.read())

                json_data.append({'user': user, "message": message})

            with open(self.chat_file, 'w') as wh:
                wh.write(ujson.dumps(json_data))

    def get_chat_data(self):

        with open(self.chat_file, "r") as rh:
            return ujson.loads(rh.read())
