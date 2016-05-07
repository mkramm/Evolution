import { connect } from 'react-redux'
import { increase } from '../../actions/index'
import ResourceButtonList from '../../components/Resource/ResourceButtonList'

const mapStateToProps = (state) => {
  console.log('container', state)
  return {
    resources: state.get('resources')
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