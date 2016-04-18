var React = require('react');
var ResourceStore = require('../stores/ResourceStore.js');
var ResourceAmountView = require('./ResourceAmountView.react.js');
var ResourceButton = require('./ResourceButton.react.js');
var ProductionStore = require('../stores/ProductionStore.js');
var ProductionActions = require('../actions/ProductionActions.js');
var ProductionButton = require('./ProductionButton.react.js');
var ResearchButton = require('./ResearchButton.react.js');

function getGameState() {
    return {
        resources: ResourceStore.getAll(),
        production: ProductionStore.getAll()
    };
}

var Game = React.createClass({
    getInitialState: function() {
        return getGameState();
    },

    componentDidMount: function() {
        ResourceStore.addChangeListener(this._onChange);
        this.interval = setInterval(this._produceResources, 100);
    },

    componentWillUnmount: function() {
        ResourceStore.removeChangeListener(this._onChange);
        clearInterval(this.interval);
    },

    _produceResources: function () {
        ProductionActions.produceResources(0);
    },

    _onChange: function() {
        this.setState(getGameState());
    },

    render: function () {
        var ResourceAmountViews = [];
        var ResourceButtons = [];

        for (var id in this.state.resources) {
            var resource = this.state.resources[id];
            if(resource.usable) {
                ResourceButtons.push(<ResourceButton id={id} key={id} />);
            }

            if (resource.usable || resource.amount > 0) {
                ResourceAmountViews.push(<ResourceAmountView id={id} key={id} />);
            }
        }

        return <div>
            <h1 className="text-center">Evolution - NextGen</h1>
            <hr />
            <div className="row text-center">
                <div className="col-sm-3">
                    <div id="amountContainer">
                        {ResourceAmountViews}
                    </div>
                </div>
                <div className="col-sm-6">
                    <div id="buttonContainer">
                        {ResourceButtons}
                        <ResearchButton />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div id="productionButtonContainer">
                        {this.state.production.map(function(result, i) {
                            return <ProductionButton id={i} key={i} />
                        })}
                    </div>
                </div>
            </div>
        </div>;
    }
});

module.exports = Game;
