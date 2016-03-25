var React = require('react');

var AmountView = React.createClass({
    render: function () {
        var className = 'amount' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <div className={className}>
            {this.props.amount}
        </div>;
    }
});

module.exports = AmountView;
