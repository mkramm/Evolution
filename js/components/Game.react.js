var React = require('react');
var ResourceStore = require('../stores/ResourceStore.js');
var ResourceAmountView = require('./ResourceAmountView.react.js');
var ResourceButton = require('./ResourceButton.react.js');

function getGameState() {
    return {
        resources: ResourceStore.getAll()
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

    render: function () {
        return <div>
            <div id="amountContainer">
                {this.state.resources.map(function(result, i) {
                    return <ResourceAmountView id={i} key={i} />
                })}
            </div>
            <div id="buttonContainer">
                {this.state.resources.map(function(result, i) {
                    return <ResourceButton id={i} key={i} />
                })}
            </div>
        </div>;
    },

    _onChange: function() {
        this.setState(getGameState());
    }
});

module.exports = Game;
