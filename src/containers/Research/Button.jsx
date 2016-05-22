import { connect } from 'react-redux'
import { decrease, activate } from '../../actions/resource'
import ResearchButton from '../../components/Research/Button'


const checkResearchCosts = function (resources) {
    return resources[0].amount >= 50;
};

export const tryToActivateNext = function (state, dispatch) {
    let resources = state.resources;
    let nextResearch = null;
    resources.forEach(function (resource, index) {
        if (nextResearch == null && resource.active === false) {
            nextResearch = index;
        }
    });
    if (nextResearch !== null) {
        dispatch(activate(nextResearch));
    }
};

const research = function (state, dispatch) {
    if (checkResearchCosts(state.resources)) {
        dispatch(decrease(0, 50));
        tryToActivateNext(state, dispatch);
    }
};

const mapStateToProps = (state) => {
  return state.toJS();
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (state) => {
      research(state, dispatch)
    }
  }
}

const ResearchButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResearchButton)

export default ResearchButtonContainer