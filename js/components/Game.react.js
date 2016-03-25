var React = require('react');
var ResourceStore = require('../stores/ResourceStore.js');
var AmountView = require('./AmountView.react.js');
var ResourceButton = require('./ResourceButton.react.js');
var ResourceActions = require('../actions/ResourceActions.js');

function getGameState() {
    var resources = ResourceStore.getAll();
    return {
        resources: resources.data
    };
}


var Game = React.createClass({
    getInitialState: function() {
        return getGameState();
    },

    componentDidMount: function() {
        ResourceStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ResourceStore.removeChangeListener(this._onChange);
    },

    handleResourceClick: function(entry) {
        ResourceActions.increaseValue(entry, 1);
    },


    render: function () {
        return <div>
            <div id="amountContainer">
                {this.state.resources.map(function(result, i) {
                    return <AmountView amount={result.value} internalId={result.internalId} key={i} />
                })}
            </div>
            <div id="buttonContainer">
                {this.state.resources.map(function(result, i) {
                    return <ResourceButton handleClick={this.handleResourceClick.bind(this, i)} internalId={result.internalId} text={result.text} key={i} />
                }.bind(this))}
            </div>
        </div>;
    },

    _onChange: function() {
        this.setState(getGameState());
    }
});

module.exports = Game;
