var SchemaObject = require('node-schema-object');
var NotEmptyString = require('./NotEmptyString');

var Resource = new SchemaObject({
    id: NotEmptyString,
    text: NotEmptyString,
    amount: Number,
    maxAmount: Number,
    usable: Boolean 
});


module.exports = Resource;