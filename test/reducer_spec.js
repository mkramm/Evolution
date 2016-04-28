import {fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';
import {gameInitialState} from '../src/store';

function setup() {
    var initialState = fromJS(gameInitialState);

    return {
        initialState
    }
}


describe('reducer', () => {
    it('TICK - increases the researched item value in the spaceShip', () => {
        const {initialState} = setup();
        const researchObj = initialState.get('researchList').get(0).set('level', 1);

        const changedInitialState = initialState.update('researchList', researchList => researchList.set(0, researchObj));

        const action = {
            type: 'TICK'
        }
        const nextState = reducer(changedInitialState, action);

        expect(nextState.get('spaceShip').get('iron')).to.equal(102.5);

    });
    it('RESEARCH - research an item with enough iron', () => {
        const {initialState} = setup();
        const spaceShip = initialState.get('spaceShip').set('iron', 100);
        const changedInitialState = initialState.set('spaceShip', spaceShip);
        const action = {
            type: 'RESEARCH',
            researchId: 1
        }
        const nextState = reducer(changedInitialState, action);

        expect(nextState.get('spaceShip').get('iron')).to.equal(0);
        expect(nextState.get('researchList').get(0).get('level')).to.equal(1);

    });
    it('RESEARCH - research an item without enough iron', () => {
        const {initialState} = setup();
        const spaceShip = initialState.get('spaceShip').set('iron', 0);
        const changedInitialState = initialState.set('spaceShip', spaceShip);

        const action = {
            type: 'RESEARCH',
            researchId: 1
        }
        const nextState = reducer(changedInitialState, action);

        expect(nextState.get('errorMsg')).to.equal('Not enugh iron');
        expect(nextState.get('spaceShip').get('iron')).to.equal(0);
        expect(nextState.get('researchList').get(0).get('level')).to.equal(0);

    });
});