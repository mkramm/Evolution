// import { combineReducers } from 'redux'
import { List, Map } from 'immutable'
import { INCREASE, DECREASE, ACTIVATE } from '../actions/resource'

let initialResources = List([
    Map({
        name: 'resource1',
        amount: 0,
        active: true
    }),
    Map({
        name: 'resource2',
        amount: 0,
        active: false
    })
]);

export const resourceReducer = function (state, action) {
    switch (action.type) {
        case INCREASE: {
            if (action.index === undefined || action.value === undefined) {
                return state;
            }

            let updateObject = state.get(action.index);
            return state.update(action.index, () => updateObject.set('amount', updateObject.get('amount') + action.value));
        }
        case DECREASE: {
            if (action.index === undefined || action.value === undefined) {
                return state;
            }

            let updateObject = state.get(action.index);
            let newAmount = Math.max(0, updateObject.get('amount') - action.value);
            if (newAmount > (updateObject.get('amount') - action.value)) {
                console.warn('try to decrease Resource ' + updateObject.get('name') + ' lower than zero', updateObject.get('amount'), (action.value * -1))
            }
            return state.update(action.index, () => updateObject.set('amount', newAmount));
        }
        case ACTIVATE: {
            if (action.index === undefined) {
                return state;
            }

            let updateObject = state.get(action.index);
            return state.update(action.index, () => updateObject.set('active', true));
        }
        default: { return state; }
    }
}

// const game = combineReducers({
//     resources
// })


const game = (state, action) => {
    if (state === undefined) {
        state = Map({
            resources: initialResources
        })
    }

    return Map({
        resources: resourceReducer(state.get('resources'), action)
    });
};

export default game;