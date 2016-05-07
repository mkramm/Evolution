import React, { PropTypes } from 'react'
// import ResourceButton from '../../containers/ResourceButton'
import ResourceButton from './ResourceButton'
import { List } from 'immutable'

class ResourceButtonList extends React.Component {
    //  shouldComponentUpdate(nextProps, nextState) {
    //     return !this.props.resources.equals(nextProps.resources);
    // }
    render() {
        return <div>
            {this.props.resources.map((resource, index) =>
                <ResourceButton
                className = 'btn btn-primary'
                key={index}
                resource={resource}
                onClick={() => this.props.onClick(index)}
                />
            )}
        </div>
    }
}

ResourceButtonList.propTypes = {
    resources: PropTypes.instanceOf(List),
    onClick: PropTypes.func.isRequired
}


export default ResourceButtonList