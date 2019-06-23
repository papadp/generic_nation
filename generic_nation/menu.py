from generic_nation.consts import MenuColumnType


class Menu(object):


    @classmethod
    def get_option_value_price(cls, options_list, index, order_value):

        option = options_list[index]

        if option["type"] == MenuColumnType.INT.name or option["type"] == MenuColumnType.BOOL:
            return option["price"]

        if option["type"] == MenuColumnType.MULTI.name:
            for x in option['options']:
                if x['name'] == order_value:
                    return x['price']

    # def __init__(self, menu_list):
    #
    #     self.menu_list = []
    #
    #     for column in menu_list:
    #
    #         if column['type'] == MenuColumnType.INT.name:
    #             price = column['price']
    #
    #         if column['type']
    #
    #         menu_dict = {"option_value": column['name']}
    #
    #         self.menu_list.append(menu_dict)
