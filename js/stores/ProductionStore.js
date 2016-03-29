var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProductionConstants = require('../constants/ProductionConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var INNER_CHANGE_EVENT = 'innerChange';

var _production = {
    data: [
        {
            internalId: 'production1',
            text: 'Production',
            amount: 0,
            usable: false,
            prodAmount: 1
        }
    ]
};

/**
 * Increase the amount of one Resource value.
 * @param  {string} id
 * @param {number} amount  amount for increase the value
 */
function increaseValue(id, amount) {
    if (_production.data[id] !== undefined && _production.data[id].usable) {
        _production.data[id].amount += amount;
    }
}

function enableResource(id) {
    if (_production.data[id] !== undefined) {
        _production.data[id].usable = true;
    }
}

function produceResources(id, resource) {
    if (_production.data[id] !== undefined && _production.data[id].usable) {
        setTimeout(function () {
            ResourceActions.increaseValue(0, _production.data[id].prodAmount * _production.data[id].amount);
        },0);
    }
}


ProductionStore = assign({}, EventEmitter.prototype, {

     /**
      * Get the entire collection of Resources.
      * @return {object}
      */
     getAll: function() {
          return _production.data;
     },

     getResourceById: function (id) {
         return _production.data[id];
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
        case ProductionConstants.PRODUCTION_INCREASE:
            increaseValue(action.id, action.amount);
            ProductionStore.emitChange();
        break;
        case ProductionConstants.PRODUCTION_ENABLE:
            enableResource(action.id);
            ProductionStore.emitChange();
        break;
        case ProductionConstants.PRODUCTION_PRODUCE:
            produceResources(action.id, action.resource);
            ProductionStore.emitChange();
    }
});

module.exports = ProductionStore;
