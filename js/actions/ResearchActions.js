
var GameDispatcher = require('../dispatcher/GameDispatcher');
var ResearchConstants = require('../constants/ResearchConstants');

var ResearchActions = {

    finishResearch: function(id) {
        GameDispatcher.dispatch({
            actionType: ResearchConstants.RESEARCH_FINISH,
            id: id
        });
    }
};

module.exports = ResearchActions;
