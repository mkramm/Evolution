var React = require('react');
var ReactPropTypes = React.PropTypes;

var AmountView = React.createClass({
    propTypes: {
        text: ReactPropTypes.string.isRequired,
        internalId: ReactPropTypes.string.isRequired,
        amount: ReactPropTypes.number.isRequired
    },
    
    render: function () {
        var className = 'amount' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <div className={className}>
            {this.props.text}: {this.props.amount}
        </div>;
    }
});

module.exports = AmountView;
