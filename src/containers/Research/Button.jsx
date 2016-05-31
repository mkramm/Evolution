import { connect } from 'react-redux'
import { decrease, activate } from '../../actions/resource'
import ResearchButton from '../../components/Research/Button'

const getCostsForNextResearch = function (research) {
    return research;
}

export const checkResearchCosts = function (store) {
    let resources = store.resources;
    let costs = getCostsForNextResearch(store.research);
    return resources[costs.type] !== undefined && resources[costs.type].amount >= costs.amount;
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

export const research = function (state, dispatch) {
    if (checkResearchCosts(state)) {
        let costs = getCostsForNextResearch(state.research);
        dispatch(decrease(costs.type, costs.amount));
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