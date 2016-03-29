var GameDispatcher = require('../dispatcher/GameDispatcher');
var ProductionConstants = require('../constants/ProductionConstants');

var ProductionActions = {
    /**
    * @param  {string} id The ID of the resource
    * @param  {number} amount
    */
    increaseValue: function(id, amount) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCTION_INCREASE_AMOUNT,
            id: id,
            amount: amount
        });
    },

    enableResource: function (id) {
        GameDispatcher.dispatch({
            actionType:ProductionConstants.PRODUCTION_ENABLE,
            id: id
        });
    },

    produceResources: function (id, amount) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCTION_PRODUCE,
            id: id,
            amount: amount
        });
    }

};

module.exports = ProductionActions;
