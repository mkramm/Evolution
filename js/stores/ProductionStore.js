var GameDispatcher = require('../dispatcher/GameDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProductionConstants = require('../constants/ProductionConstants');
var ResourceActions = require('../actions/ResourceActions');
var assign = require('object-assign');

var USE_EVENT = 'use';

var MAX_VALUE = 100;
var MIN_VALUE = 0;
var CARBON_USE_PER_UNIT = .2;


var _gasBucket = {
    carbon: MAX_VALUE,
    oxygen: MIN_VALUE
};

function produceResources(type, value) {
    usage = value * CARBON_USE_PER_UNIT;
    if(type == 'carbon' && usage > 0 && _gasBucket.carbon >= MIN_VALUE) {
        _gasBucket.carbon = (Math.round((_gasBucket.carbon - usage) * 10) / 10);
        _gasBucket.oxygen = (Math.round((_gasBucket.oxygen + usage) * 10) / 10);

        if(_gasBucket.carbon <= MIN_VALUE) {
            var amountOfTooManyUsers = Math.ceil((_gasBucket.carbon * -1) / CARBON_USE_PER_UNIT);
            _gasBucket.carbon = MIN_VALUE;
            _gasBucket.oxygen = MAX_VALUE;
            setTimeout(function () {
                ResourceActions.increaseValue(0, (amountOfTooManyUsers * -1));
            }, 0);
        }
    }

}

var ProductionStore = assign({}, EventEmitter.prototype, {
    getAll: function(){
        return _gasBucket;
    },
    emitUse: function() {
        this.emit(USE_EVENT);
    },
    addUseListener: function (callback) {
        this.on(USE_EVENT, callback);
    },
    removeUseListener: function (callback) {
        this.removeListener(USE_EVENT, callback);
    }
});

GameDispatcher.register(function(action) {
    switch (action.actionType) {
        case ProductionConstants.PRODUCE_RESOURCES:
            produceResources(action.type, action.value);
            ProductionStore.emitUse();
        break;
    }
});

module.exports = ProductionStore;
