var React = require('react');
var ReactPropTypes = React.PropTypes;
var ResourceActions = require('../actions/ResourceActions.js');

function getResourceState(id) {
    return ResourceStore.getResourceById(id);
}


var ResourceButton = React.createClass({
    propTypes: {
        id: ReactPropTypes.string.isRequired,
    },
    
    getInitialState: function() {
        return getResourceState(this.props.id);
    },

    componentDidMount: function() {
        ResourceStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ResourceStore.removeChangeListener(this._onChange);
    },

    handleClick: function() {
        ResourceActions.increaseValue(this.props.id, 1);
    },
    render: function () {
        var className = 'btn btn-primary';
        return <button onClick={this.handleClick} className={className}>{this.state.text}</button>;
    },

    _onChange: function() {
        this.setState(getResourceState(this.props.id));
    }
});

module.exports = ResourceButton;
