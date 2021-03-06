from generic_nation.consts import MenuColumnType
from generic_nation.db.nation import Nation
from generic_nation.db.session import reset, DbSession

reset()

session = DbSession.get_active_session()

n = Nation("WB nation", [
    {
        "name": "Girl scout cookies",
        "type": MenuColumnType.INT.name,
        'price': 70
    },
    {
        "name": "Dodro Haze",
        "type": MenuColumnType.INT.name,
        'price': 75
    },

])

n.order.rows = [
    {
        'user': "shraga diggy",
        'active': True,
        'values': [5, 15]
    },
    {
        'user': "papad",
        'active': True,
        'values': [5, 15]
    }
]

session.add(n)

n = Nation("Yom tov Nation", [
    {
        "name": "Main Dish",
        "type": MenuColumnType.MULTI.name,
        "options":
            [
                {
                    'name': "Haze Of",
                    'price': 42
                },
                {
                    "name": 'Schnitzel',
                    'price': 42
                }
            ]
    },
    {
        "name": "Side Dish",
        "type": MenuColumnType.MULTI.name,
        "options":
            [
                {
                    'name': "Orez Lavan",
                    "price": 0
                },
                {
                    "name": "Bacon",
                    "price": 4
                }
            ]
    }
])

n.order.rows = [
    {
        'user': 'Ruhama Cohen',
        'active': True,
        'values': ['Haze Of', 'Bacon']
    },
    {
        'user': 'Bet Resh',
        'active': False,
        'values': ['Schnitzel', 'Bacon']
    }
]

session.add(n)
session.commit()

