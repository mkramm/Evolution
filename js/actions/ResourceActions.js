
var GameDispatcher = require('../dispatcher/GameDispatcher');
var ResourceConstants = require('../constants/ResourceConstants');

var ResourceActions = {
    /**
    * @param  {string} id The ID of the resource
    * @param  {number} amount
    */
    increaseValue: function(id, amount) {
        GameDispatcher.dispatch({
            actionType: ResourceConstants.RESOURCE_INCREASE,
            id: id,
            amount: amount
        });
    },

    enableResource: function (id) {
        GameDispatcher.dispatch({
            actionType: ResourceConstants.RESOURCE_ENABLE,
            id: id
        });
    },
};

module.exports = ResourceActions;
