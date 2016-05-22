import React, { PropTypes } from 'react';


class ResearchButton extends React.Component {
    render() {
        return <button onClick={()=>this.props.onClick(this.props)}>
            {this.props.name}
            </button>
    }
}

ResearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ResearchButton;