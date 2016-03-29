
var GameDispatcher = require('../dispatcher/GameDispatcher');
var ProductionConstants = require('../constants/ProductionConstants');

var ProductionActions = {
    /**
    * @param  {string} type
    * @param  {number} value
    */
    produceResources: function(type, value) {
        GameDispatcher.dispatch({
            actionType: ProductionConstants.PRODUCE_RESOURCES,
            type: type,
            value: value
        });
    }
};

module.exports = ProductionActions;
