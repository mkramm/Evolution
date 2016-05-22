import React, { PropTypes } from 'react';


class ProductionButton extends React.Component {
    render() {
        return <button>
            {this.props.name}
            </button>
    }
}

ProductionButton.propTypes = {
  name: PropTypes.string.isRequired,
}

export default ProductionButton;