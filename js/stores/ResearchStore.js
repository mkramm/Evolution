var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ResearchConstants = require('../constants/ResearchConstants');
var assign = require('object-assign');

var researchType = require('../constants/ResearchTypes.js');    
var researchStatus = require('../constants/ResearchStatus.js');
var resourceIds = require('../constants/ResourceIds.js');
var productionIds = require('../constants/ProductionIds.js');


var researchIds = require('../constants/ResearchIds');

var EVENT_RESEARCH = 'research';
var EVENT_RESEARCH_RESOURCE = 'researchResource';
var EVENT_RESEARCH_PRODUCTION = 'researchProduction';

var _research = {
    [researchIds.research1]: {
        id: researchIds.research1,
        order: 1,
        status: researchStatus.AVAILABLE,
        costs: [
            {
                id: resourceIds.food1,
                amount: 5
            }
        ],
        requirements: [
            {
                type: researchType.RESOURCE,
                id: resourceIds.food1,
                amount: 1
            }
        ] 
    },
    [researchIds.research2]: {
        id: researchIds.research2,
        order: 2,
        status: researchStatus.AVAILABLE,
        costs: [
            {
                id: resourceIds.material1,
                amount: 25
            }
        ],
        requirements: [
            {
                type: researchType.RESOURCE,
                id: resourceIds.material1,
                amount: 1
            }
        ]
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