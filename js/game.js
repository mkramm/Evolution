var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var start = new Date().getTime();
setInterval(function() {
    ReactDOM.render(
        <App />,
    document.getElementById('container')
    );
}, 50);

var AmountView = React.createClass({
    render: function () {
        var className = 'amount' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <div className={className}>
            {this.props.amount}
        </div>;
    }
});

var ResourceButton = React.createClass({
    render: function () {
        var className = 'buttonRes' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <button onClick={this.props.handleClick} className={className}>{this.props.text}</button>;
    }
});

var ProductionButton = React.createClass({
    render: function () {
        var className = 'buttonProd' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <button onClick={this.props.handleClick} className={className}>{this.props.text}({this.props.amount})</button>
    }
});


var App = React.createClass({
    getInitialState: function () {
        return {
            resources:[
                {
                    internalId: 'archaeen',
                    text: 'Archaeon',
                    value: 0
                }
            ],
            production: [
                {
                    internalId: 'carbongenerator',
                    text: 'Carbon Generator2',
                    valueIncrease: 1,
                    amount: 0,
                    costs: {
                        resource: 'archaeen',
                        amount: 25
                    }
                }
            ]
        };
    },

handleResourceClick: function(entry) {
    this.setState(function (state) {
        return {
            resources: update(this.state.resources, {[entry]: {value: {$set: state.resources[entry].value + 1}}})
        }
    });
},

handleProductionClick: function(entry) {
    this.setState(function (state) {
        return {
            production: update(this.state.production, {[entry]: {amount: {$set: state.production[entry].amount + 1}}})
        }
    });
},

render: function () {
    return <div id="App">
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
        <div id="prodContainer">
            {this.state.production.map(function(result, i) {
                return <ProductionButton handleClick={this.handleProductionClick.bind(this, i)} internalId={result.internalId} text={result.text} amount={result.amount} key={i} />
            }.bind(this))}
        </div>

    </div>;
}

});
