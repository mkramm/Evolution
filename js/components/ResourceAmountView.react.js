var React  = require('react');
var ReactPropTypes = React.PropTypes;
var AmountView = require('./AmountView.react.js');

function getResourceState(id) {
    return ResourceStore.getResourceById(id);
}

var ResourceAmountView = React.createClass({
    propTypes: {
        id: ReactPropTypes.number.isRequired,
    },
    
    getInitialState: function () {
        return getResourceState(this.props.id);
    },

    componentDidMount: function() {
        ResourceStore.addInnerChangeListener(this._onInnerChange);
    },

    componentWillUnmount: function() {
        ResourceStore.removeInnerChangeListener(this._onInnerChange);
    },

    render: function () {
        return <AmountView text={this.state.text} amount={parseFloat((this.state.amount).toFixed(2))} internalId={this.state.internalId} />;
    },

    _onInnerChange: function() {
        this.setState(getResourceState(this.props.id));
    }
});


module.exports = ResourceAmountView;
