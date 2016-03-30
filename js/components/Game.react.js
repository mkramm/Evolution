var React = require('react');
var ResourceStore = require('../stores/ResourceStore.js');
var ResourceAmountView = require('./ResourceAmountView.react.js');
var ResourceButton = require('./ResourceButton.react.js');
var RequirementStore = require('../stores/RequirementStore.js');
var RequirementActions = require('../actions/RequirementActions.js');
var ResourceActions = require('../actions/ResourceActions.js');
var ProductionStore = require('../stores/ProductionStore.js');
var ProductionActions = require('../actions/ProductionActions.js');
var ProductionButton = require('./ProductionButton.react.js');

function getGameState() {
    return {
        resources: ResourceStore.getAll(),
        nextRequirement: RequirementStore.getNext(),
        production: ProductionStore.getAll()
    };
}


var Game = React.createClass({
    getInitialState: function() {
        return getGameState();
    },

    componentDidMount: function() {
        ResourceStore.addChangeListener(this._onChange);
        RequirementStore.addChangeListener(this._onChange);
        this.interval = setInterval(this._produceResources, 100);
    },

    componentWillUnmount: function() {
        ResourceStore.removeChangeListener(this._onChange);
        RequirementStore.removeChangeListener(this._onChange);
        clearInterval(this.interval);
    },

    useYourBrain: function (){
        if(undefined !== this.state.nextRequirement && this.state.resources[this.state.nextRequirement.requiredId].amount >= this.state.nextRequirement.amount) {
            ResourceActions.enableResource(this.state.nextRequirement.id);
            ResourceActions.increaseValue(this.state.nextRequirement.requiredId, (this.state.nextRequirement.amount * -1));
            RequirementActions.increaseNext();
        }
    },

    _produceResources: function () {
        ProductionActions.produceResources(0);
    },

    _onChange: function() {
        this.setState(getGameState());
    },

    render: function () {
        var brainButton = '';
        var ResourceAmountViews = [];
        var ResourceButtons = [];

        if(undefined !== this.state.nextRequirement) {
            brainButton = <button className="btn btn-primary" disabled={this.state.resources[this.state.nextRequirement.requiredId].amount < this.state.nextRequirement.amount} id="useYourBrain" onClick={this.useYourBrain}>Use Your Brain</button>
        }

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
            <hr></hr>
            <div className="row text-center">
                <div className="col-sm-3">
                    <div id="amountContainer">
                        {ResourceAmountViews}
                    </div>
                </div>
                <div className="col-sm-6">
                    <div id="buttonContainer">
                        {ResourceButtons}
                        {brainButton}
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
