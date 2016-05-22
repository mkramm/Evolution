import { connect } from 'react-redux'
import { increase } from '../../actions/resource'
import ResourceButtonList from '../../components/Resource/ResourceButtonList'

const mapStateToProps = (state) => {
  return {
    resources: state.get('resources').filter(resource => resource.get('active') !== false)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (index) => {
      dispatch(increase(index, 2))
    }
  }
}

const ResourcButtonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceButtonList)

export default ResourcButtonListContainer