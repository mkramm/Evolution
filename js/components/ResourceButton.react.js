var React = require('react');
var ReactPropTypes = React.PropTypes;

var ResourceButton = React.createClass({
    propTypes: {
        internalId: ReactPropTypes.string.isRequired,
        handleClick: ReactPropTypes.func.isRequired,
        text: ReactPropTypes.string.isRequired,
    },
    render: function () {
        var className = 'buttonRes' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
        return <button onClick={this.props.handleClick} className={className}>{this.props.text}</button>;
    }
});

module.exports = ResourceButton;
