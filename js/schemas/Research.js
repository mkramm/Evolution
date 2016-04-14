var SchemaObject = require('node-schema-object');
var NotEmptyString = require('./NotEmptyString');

var Research = new SchemaObject({
    id: NotEmptyString,
    order: Number,
    type: NotEmptyString,
    status: NotEmptyString,
    costs: [],
    requirements: [] 
});


module.exports = Research;