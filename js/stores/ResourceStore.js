var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ResourceConstants = require('../constants/ResourceConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _resources = {
    data: [
        {
            internalId: 'archaeen',
            text: 'Archaeon',
            value: 0
        }
    ]
};

/**
 * Increase the amount of one Resource value.
 * @param  {string} id
 * @param {number} amount for increase the value
 */
function increaseValue(id, value) {
    _resources.data[id].value += value;
}


ResourceStore = assign({}, EventEmitter.prototype, {

     /**
      * Get the entire collection of Resources.
      * @return {object}
      */
     getAll: function() {
          return _resources;
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
    }
});

GameDispatcher.register(function(action) {
    switch(action.actionType) {
        case ResourceConstants.RESOURCE_INCREASE:
            increaseValue(action.id, action.value);
            ResourceStore.emitChange();
        break;
    }
});

module.exports = ResourceStore;
