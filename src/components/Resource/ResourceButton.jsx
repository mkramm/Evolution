import React, { PropTypes } from 'react';
import { Map } from 'immutable';

class ResourceButton extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.resource.equals(nextProps.resource);
    }
    render () {
        return <button onClick = {this.props.onClick} className={this.props.className}>
            {this.props.resource.get('name')} ({this.props.resource.get('amount')})
        </button>;
    }
}

ResourceButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  resource: PropTypes.instanceOf(Map),
  className: PropTypes.string
}

export default ResourceButton