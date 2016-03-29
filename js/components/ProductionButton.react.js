var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProductionActions = require('../actions/ProductionActions.js');

function getResourceState(id) {
    return ProductionStore.getResourceById(id);
}


var ProductionButton = React.createClass({
    propTypes: {
        id: ReactPropTypes.number.isRequired,
    },
    getInitialState: function() {
        return getResourceState(this.props.id);
    },

    componentDidMount: function() {
        ProductionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ProductionStore.removeChangeListener(this._onChange);
    },

    handleClick: function() {
        ProductionActions.produceResources(this.props.id, this.props.amount);
    },

    render: function () {
        var className = 'btn btn-primary';
        return <button onClick={this.handleClick} className={className}>{this.state.text}</button>;
    },

    _onChange: function() {
        this.setState(getResourceState(this.props.id));
    }
});

module.exports = ProductionButton;
