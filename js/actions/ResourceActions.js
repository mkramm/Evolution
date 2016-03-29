
var GameDispatcher = require('../dispatcher/GameDispatcher');
var ResourceConstants = require('../constants/ResourceConstants');

var ResourceActions = {
    /**
    * @param  {string} id The ID of the resource
    * @param  {string} text
    */
    increaseValue: function(id, value) {
        GameDispatcher.dispatch({
            actionType: ResourceConstants.RESOURCE_INCREASE,
            id: id,
            value: value
        });
    }
};

module.exports = ResourceActions;
