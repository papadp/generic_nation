from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship, backref

from generic_nation.db import Base
from generic_nation.db.order import Order


class Nation(Base):
    __tablename__ = 'nation'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    columns = Column(JSON, nullable=False)

    order_id = Column(Integer, ForeignKey('order.id'))
    order = relationship("Order", backref=backref('order', uselist=False))

    def __init__(self, name, columns):
        self.name = name
        self.columns = columns
        self.order = Order()

    def reset_order(self):
        self.order.reset_order()
