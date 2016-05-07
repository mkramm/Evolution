// import { combineReducers } from 'redux'
import { List, Map } from 'immutable'
import { INCREASE } from '../actions/index'

let initialResources = List([
    Map({
        name: 'resource1',
        amount: 0
    }),
    Map({
        name: 'resource2',
        amount: 0
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