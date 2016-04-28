import { combineReducers } from 'redux'
import { List, Map } from 'immutable'
import { INCREASE } from '../actions/index'

let initialState = List([
    Map({
        name: 'resource1',
        amount: 0
    }),
    Map({
        name: 'resource2',
        amount: 0
    })
]);



const resources = function (state = initialState, action) {
    switch (action.type) {
        case INCREASE: {
            console.log('reducer', state, action)
           let updateObject = state.get(action.index);
           return state.update(action.index, () => updateObject.set('amount', updateObject.get('amount') + action.value));
        }
        default: {return state;}
    }
} 

const resourceLength = function (state = 0, action) {
    console.log('resourceLength', state);
    if(state != initialState.size) {
        return initialState.size;
    }
    return state;
}

const game = combineReducers({
    resources,
    resourceLength
})
export default game;