var React = require('react');
var ReactPropTypes = React.PropTypes;
var ResourceActions = require('../actions/ResourceActions.js');

var ResourceButton = React.createClass({
    propTypes: {
        internalId: ReactPropTypes.string.isRequired,
        id: ReactPropTypes.number.isRequired,
        text: ReactPropTypes.string.isRequired,
    },
    handleClick: function() {
        ResourceActions.increaseValue(this.props.id, 1);
    },
    render: function () {
        var className = 'buttonRes' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <button onClick={this.handleClick} className={className}>{this.props.text}</button>;
    }
});

module.exports = ResourceButton;
