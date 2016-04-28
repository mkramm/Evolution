import React, { PropTypes } from 'react'
import ResourceButton from '../../containers/ResourceButton'
import { List } from 'immutable'

const ResourceButtonList = ({resourceLength}) => {
    let resourceButtons = [];
    for (let i=0; i < resourceLength; i++){
        resourceButtons.push(<ResourceButton
                index = {i}
                className = 'btn btn-primary'
                key={i}
            />);
    }
    return <div>
        <button>test</button>
        {resourceButtons}
    </div>
};

ResourceButtonList.propTypes = {
  resourceLength: PropTypes.number.isRequired
}


export default ResourceButtonList