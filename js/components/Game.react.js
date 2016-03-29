var React = require('react');
var ResourceStore = require('../stores/ResourceStore.js');
var ResourceAmountView = require('./ResourceAmountView.react.js');
var ResourceButton = require('./ResourceButton.react.js');
var GasBucketStore = require('../stores/GasBucketStore.js');
var GasBucketActions = require('../actions/GasBucketActions.js');

function getGameState() {
    return {
        resources: ResourceStore.getAll(),
        gasBucket: GasBucketStore.getAll()
    };
}


var Game = React.createClass({
    getInitialState: function() {
        return getGameState();
    },

    componentDidMount: function() {
        ResourceStore.addChangeListener(this._onChange);
        GasBucketStore.addUseListener(this._onChange);
        this.interval = setInterval(this._useCarbon, 1000);
    },

    componentWillUnmount: function() {
        ResourceStore.removeChangeListener(this._onChange);
        GasBucketStore.removeUseListener(this._onChange);
        clearInterval(this.interval);
    },

    render: function () {
        return <div>
            <div id="gas">
                <div>
                    carbon: {this.state.gasBucket.carbon}
                </div>
                <div>
                    oxygen: {this.state.gasBucket.oxygen}
                </div>
            </div>
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
    },

    _useCarbon: function() {
        GasBucketActions.useGas('carbon', this.state.resources[0].value);
    }
});

module.exports = Game;
