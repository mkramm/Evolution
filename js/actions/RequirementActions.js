
var GameDispatcher = require('../dispatcher/GameDispatcher');
var RequirementConstants = require('../constants/RequirementConstants');

var RequirementActions = {

    increaseNext: function() {
        GameDispatcher.dispatch({
            actionType: RequirementConstants.REQUIREMENT_INCREASE_NEXT
        });
    }
};

module.exports = RequirementActions;
