import { fromJS, List, Map } from 'immutable';
import { expect } from 'chai';
import {resourceReducer} from '../src/reducers/index';
import { INCREASE } from '../src/actions/index'
// overwirte console methods to avoid debug messages in our tests
console.warn = function () { };

describe('resource reducer', () => {
    it('Increase the amount from zero', () => {
        let state = List([
            Map({
                name: 'resource1',
                amount: 0
            }),
            Map({
                name: 'resource2',
                amount: 0
            })
        ]);

        let action = {
            type: INCREASE,
            index: 0,
            value: 2
        };
        let shouldState = resourceReducer(state, action);

        expect(shouldState.get(0).get('name')).to.equal('resource1');
        expect(shouldState.get(0).get('amount')).to.equal(2);
        expect(shouldState.get(1).get('name')).to.equal('resource2');
        expect(shouldState.get(1).get('amount')).to.equal(0);
    });
    it('Increase the amount from higher than zero', () => {
        let state = List([
            Map({
                name: 'resource1',
                amount: 0
            }),
            Map({
                name: 'resource2',
                amount: 2
            })
        ]);

        let action = {
            type: INCREASE,
            index: 1,
            value: 2
        };
        let shouldState = resourceReducer(state, action);

        expect(shouldState.get(0).get('name')).to.equal('resource1');
        expect(shouldState.get(0).get('amount')).to.equal(0);
        expect(shouldState.get(1).get('name')).to.equal('resource2');
        expect(shouldState.get(1).get('amount')).to.equal(4);
    });
    it('Increase the amount NOT, without value', () => {
        let state = List([
            Map({
                name: 'resource1',
                amount: 0
            }),
            Map({
                name: 'resource2',
                amount: 0
            })
        ]);

        let action = {
            type: INCREASE,
            index: 0
        };
        let shouldState = resourceReducer(state, action);

        expect(shouldState.get(0).get('name')).to.equal('resource1');
        expect(shouldState.get(0).get('amount')).to.equal(0);
        expect(shouldState.get(1).get('name')).to.equal('resource2');
        expect(shouldState.get(1).get('amount')).to.equal(0);
    });
    it('Increase the amount NOT, without index', () => {
        let state = List([
            Map({
                name: 'resource1',
                amount: 0
            }),
            Map({
                name: 'resource2',
                amount: 0
            })
        ]);

        let action = {
            type: INCREASE,
            value: 2
        };
        let shouldState = resourceReducer(state, action);

        expect(shouldState.get(0).get('name')).to.equal('resource1');
        expect(shouldState.get(0).get('amount')).to.equal(0);
        expect(shouldState.get(1).get('name')).to.equal('resource2');
        expect(shouldState.get(1).get('amount')).to.equal(0);
    });
    it('Increase the amount NOT, without type', () => {
        let state = List([
            Map({
                name: 'resource1',
                amount: 0
            }),
            Map({
                name: 'resource2',
                amount: 0
            })
        ]);

        let action = {
            index: 0,
            value: 2
        };
        let shouldState = resourceReducer(state, action);

        expect(shouldState.get(0).get('name')).to.equal('resource1');
        expect(shouldState.get(0).get('amount')).to.equal(0);
        expect(shouldState.get(1).get('name')).to.equal('resource2');
        expect(shouldState.get(1).get('amount')).to.equal(0);
    });
});
