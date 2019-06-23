from generic_nation.db import nation, menu_column
from generic_nation.db import engine, Base
from sqlalchemy import MetaData
from sqlalchemy.orm import sessionmaker


def create():
    # print("[DB] Creating all")
    # print(Base.metadata.tables)
    Base.metadata.create_all(engine)


def reset():
    # print("[DB] Dropping all")
    metadata = MetaData(bind=engine)
    metadata.reflect(bind=engine)
    metadata.drop_all(engine)
    create()


class DbSession(object):

    active_session = sessionmaker(bind=engine)()

    @classmethod
    def get_active_session(cls):
        return cls.active_session
