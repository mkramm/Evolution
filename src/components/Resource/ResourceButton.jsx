import React, { PropTypes } from 'react'
import { Map } from 'immutable'

const ResourceButton = ({onClick, index, resource, className}) => {
    return <button onClick = {() => onClick(index)} className={className}>
        {resource.get('name')} ({resource.get('amount')})
    </button>;
}

ResourceButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  resource: PropTypes.instanceOf(Map),
  index: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default ResourceButton