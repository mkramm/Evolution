import { connect } from 'react-redux'
import { increase } from '../actions/index'
import ResourceButton from '../components/Resource/ResourceButton'

const mapStateToProps = (state, ownProps) => {
  console.log('resource Button', state.resources.get(ownProps.index));
  //console.log('resource Button', state[ownProps.index], state, ownProps);
  return {
    resource: state.resources.get(ownProps.index)
    //resource: state[ownProps.index]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (index) => {
        dispatch(increase(index, 2))
    }
  }
}

const ResourcButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceButton)

export default ResourcButtonContainer