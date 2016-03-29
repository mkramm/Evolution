
var GameDispatcher = require('../dispatcher/GameDispatcher');
var GasBucketConstants = require('../constants/GasBucketConstants');

var GasBucketActions = {
    /**
    * @param  {string} type
    * @param  {number} value
    */
    useGas: function(type, value) {
        GameDispatcher.dispatch({
            actionType: GasBucketConstants.GAS_BUCKET_USE,
            type: type,
            value: value
        });
    }
};

module.exports = GasBucketActions;
