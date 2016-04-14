var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ResearchConstants = require('../constants/ResearchConstants');
var assign = require('object-assign');
    
var researchType = require('../constants/ResearchTypes.js');
var researchStatus = require('../constants/ResearchStatus.js');
var resourceIds = require('../constants/ResourceIds.js');
var productionIds = require('../constants/ProductionIds.js');

var EVENT_RESEARCH = 'research';
var EVENT_RESEARCH_RESOURCE = 'researchResource';
var EVENT_RESEARCH_PRODUCTION = 'researchProduction';

var _research = {
    [resourceIds.material1]: {
        id: resourceIds.material1,
        order: 1,
        type: researchType.RESOURCE,
        status: researchStatus.AVAILABLE,
        costs: [
            {
                id: resourceIds.food1,
                amount: 5
            }
        ],
        requirements: [] 
    },
    production1: {
        id: productionIds.production1,
        order: 2,
        type: researchType.PRODUCTION,
        status: researchStatus.AVAILABLE,
        costs: [
            {
                id: resourceIds.material1,
                amount: 25
            }
        ],
        requirements: []
    }
};


function _getAvailableResearch() {
    var available = [];
    
    for (var key in _research) {
        if(_research[key].status == researchStatus.AVAILABLE) {
            available.push(_research[key]);
        }
    }
    return available;
}

function _getNextResearch () {
    var availableResearch = _getAvailableResearch();
    var nextResearch = null;
    availableResearch.forEach(function(research, index, array) {
        if(nextResearch === null || research.order < nextResearch.order) {
            nextResearch = research;
        }
    });
    return nextResearch;
}

function _finishResearch(id) {
    if(_research[id].status == researchStatus.AVAILABLE) {
        _research[id].status = researchStatus.RESEARCHED;
    }
}

var ResearchStore = assign({}, EventEmitter.prototype, {
    getNextResearch: function () {
        return _getNextResearch();
    },
  
    //changes for all research
    emitResearch:function () {
        this.emit(EVENT_RESEARCH)
    },
    addResearchListener: function (callback) {
        this.on(EVENT_RESEARCH, callback);
    },
    removeResearchListener: function (callback) {
        this.removeListener(EVENT_RESEARCH, callback);
    },
    
    //changes only for Resource Research
    emitResearchResource:function () {
        this.emit(EVENT_RESEARCH_RESOURCE)
    },
    addResearchResourceListener: function (callback) {
        this.on(EVENT_RESEARCH_RESOURCE, callback);
    },
    removeResearchResourceListener: function (callback) {
        this.removeListener(EVENT_RESEARCH_RESOURCE, callback);
    },
    
    //changes only for Production Research
    emitResearchProduction:function () {
        this.emit(EVENT_RESEARCH_PRODUCTION)
    },
    addResearchProductionListener: function (callback) {
        this.on(EVENT_RESEARCH_PRODUCTION, callback);
    },
    removeResearchProductionListener: function (callback) {
        this.removeListener(EVENT_RESEARCH_PRODUCTION, callback);
    }
});

GameDispatcher.register(function(action) {
    switch(action.actionType) {
        case ResearchConstants.RESEARCH_FINISH:
            _finishResearch(action.id);
            ResearchStore.emitResearch();
        break;
    }
});

module.exports = ResearchStore;