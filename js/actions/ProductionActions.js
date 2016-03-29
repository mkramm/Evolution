var GameDispatcher = require('../dispatcher/GameDispatcher');
var ProductionConstants = require('../constants/ProductionConstants');

var ProductionActions = {

    /**
    * @param  {string} type
    * @param  {number} value
    */
    increaseValue: function(id, amount) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCTION_INCREASE,
            id: id,
            amount: amount
        });
    },

    produceResources: function(id) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCTION_PRODUCE,
            id: id
        });
    },

    enableProduction: function(id) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCTION_ENABLE,
            id: id
        });
    }
};

module.exports = ProductionActions;
