import _ from "lodash";

export const updateInArray = (array, index, update) => {
    return _.map(array, function(a, i) {
      return i === index ? {...a, ...update} : a
    })
}