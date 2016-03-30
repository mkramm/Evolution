var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var RequirementConstants = require('../constants/RequirementConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'requirementChange';

var _requirements = {
    data: [
        {
            id: 'material1',
            amount: 5,
            requiredId: 'food1'
        },
        {
            id: 'food2',
            amount: 25,
            requiredId: 'material1'
        }
    ]
};

var nextRequirement = 0;

function increaseNextRequirement (){
    nextRequirement++;
    // if(_requirements.data[nextRequirement] === undefined) {
    //     nextRequirement = -1;
    // }
}

RequirementStore = assign({}, EventEmitter.prototype, {

     /**
      * Get the entire collection of Resources.
      * @return {object}
      */
     getNext: function () {
         return _requirements.data[nextRequirement];
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
});

GameDispatcher.register(function(action) {
    switch(action.actionType) {
        case RequirementConstants.REQUIREMENT_INCREASE_NEXT:
            increaseNextRequirement();
            RequirementStore.emitChange();
        break;
    }
});

module.exports = RequirementStore;
