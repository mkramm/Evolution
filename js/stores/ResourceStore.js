var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ResourceConstants = require('../constants/ResourceConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var INNER_CHANGE_EVENT = 'innerChange';

var _resources = {
    data: [
        {
            internalId: 'food1',
            text: 'Food',
            amount: 0,
            usable: true
        },
        {
            internalId: 'material1',
            text: 'Material',
            amount: 0,
            usable: false
        }
    ]
};

/**
 * Increase the amount of one Resource value.
 * @param  {string} id
 * @param {number} amount  amount for increase the value
 */
function increaseValue(id, amount) {
    if(_resources.data[id] !== undefined && _resources.data[id].usable) {
        _resources.data[id].amount += amount;
    }
}

function enableResource(id) {
    if(_resources.data[id] !== undefined) {
        _resources.data[id].usable = true;
    }
}

ResourceStore = assign({}, EventEmitter.prototype, {

     /**
      * Get the entire collection of Resources.
      * @return {object}
      */
     getAll: function() {
          return _resources.data;
     },

     getResourceById: function (id) {
         return _resources.data[id];
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
    }
});

module.exports = ResourceStore;
