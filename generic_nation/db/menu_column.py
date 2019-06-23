# from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Float
# from sqlalchemy.orm import relationship
#
# from generic_nation.db import Base
# from generic_nation.db.consts import MenuColumnType
#
#
# class MenuColumn(Base):
#     __tablename__ = 'menu_column'
#
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True, unique=True)
#     type = Column(Enum(MenuColumnType), index=True, nullable=False)
#     price = Column(Float, index=True)
#
#     nation_id = Column(Integer, ForeignKey('nation.id'), nullable=False, index=True)
#     # nation = relationship("Nation", back_populates="column")
#
