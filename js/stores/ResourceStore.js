var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ResourceConstants = require('../constants/ResourceConstants');
var Resource = require('../schemas/Resource.js');
var assign = require('object-assign');
var resourceIds = require('../constants/ResourceIds.js');
var researchIds = require('../constants/ResearchIds.js');
var ResearchConstants = require('../constants/ResearchConstants');

var CHANGE_EVENT = 'change';
var INNER_CHANGE_EVENT = 'innerChange';
var maxAmount = 50;

var _resources = {
    [resourceIds.food1]: new Resource({
        id: resourceIds.food1,
        text: 'Food',
        amount: 0,
        maxAmount: maxAmount,
        usable: true,
        requirement: ''
    }),
    [resourceIds.material1]: new Resource({
        id: resourceIds.material1,
        text: 'Material',
        amount: 0,
        maxAmount: maxAmount,
        usable: false,
        requirement: researchIds.research1
    })
};


function tryToUnlock(researchId) {
    var emit = false;
    for(var key in _resources) {
        var resource = _resources[key];
        if(resource.usable === false && resource.requirement == researchId) {
            resource.usable = true;
            emit = true;
        }
    }
    
    if(emit) {
        ResourceStore.emitChange();
    }
}

/**
 * Increase the amount of one Resource value.
 * @param  {string} id
 * @param {number} amount  amount for increase the value
 */
function increaseValue(id, amount) {
    if(_resources[id] !== undefined && _resources[id].usable) {
        if(_resources[id].amount < _resources[id].maxAmount) {
            _resources[id].amount += amount;
        } else {
            _resources[id].amount = maxAmount;
        }
    }
}

function enableResource(id) {
    if(_resources[id] !== undefined) {
        _resources[id].usable = true;
    }
}

ResourceStore = assign({}, EventEmitter.prototype, {

     /**
      * Get the entire collection of Resources.
      * @return {object}
      */
     getAll: function() {
          return _resources;
     },

     getResourceById: function (id) {
         return _resources[id];
     },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
},

    emitInnerChange: function() {
        this.emit(INNER_CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addInnerChangeListener: function(callback) {
        this.on(INNER_CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeInnerChangeListener: function(callback) {
        this.removeListener(INNER_CHANGE_EVENT, callback);
    }
});

GameDispatcher.register(function(action) {
    switch(action.actionType) {
        case ResourceConstants.RESOURCE_INCREASE:
            increaseValue(action.id, action.amount);
            ResourceStore.emitChange();
        break;
        case ResourceConstants.RESOURCE_ENABLE:
            enableResource(action.id);
            ResourceStore.emitChange();
        break;
        case ResearchConstants.RESEARCH_FINISH:
            tryToUnlock(action.id);
        break;
    }
});

module.exports = ResourceStore;
