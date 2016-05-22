import { fromJS, List, Map } from 'immutable';
import { expect } from 'chai';
import {resourceReducer} from '../src/reducers/index';
import { INCREASE, DECREASE, ACTIVATE } from '../src/actions/resource'
// overwirte console methods to avoid debug messages in our tests
console.warn = function () { };

describe('resource reducer', () => {
    describe('INCREASE', () => {
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

    describe('DECREASE', () => {
        it('Decrease the amount to zero', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2
                }),
                Map({
                    name: 'resource2',
                    amount: 2
                })
            ]);

            let action = {
                type: DECREASE,
                index: 0,
                value: 2
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('amount')).to.equal(0);
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('amount')).to.equal(2);
        });
        it('Decrease the amount to higher than zero', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2
                }),
                Map({
                    name: 'resource2',
                    amount: 4
                })
            ]);

            let action = {
                type: DECREASE,
                index: 1,
                value: 2
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('amount')).to.equal(2);
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('amount')).to.equal(2);
        });
        it('Decrease the amount to lower than zero', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2
                }),
                Map({
                    name: 'resource2',
                    amount: 1
                })
            ]);

            let action = {
                type: DECREASE,
                index: 1,
                value: 2
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('amount')).to.equal(2);
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('amount')).to.equal(0);
        });
        it('Decrease the amount NOT, without value', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2
                }),
                Map({
                    name: 'resource2',
                    amount: 2
                })
            ]);

            let action = {
                type: DECREASE,
                index: 0
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('amount')).to.equal(2);
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('amount')).to.equal(2);
        });
        it('Decrease the amount NOT, without index', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2
                }),
                Map({
                    name: 'resource2',
                    amount: 2
                })
            ]);

            let action = {
                type: DECREASE,
                value: 2
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('amount')).to.equal(2);
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('amount')).to.equal(2);
        });

    });
    describe('ACTIVATE', () => {
        it('activate a deactivate Resource', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2,
                    active: false
                })
            ]);

            let action = {
                type: ACTIVATE,
                index: 0
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('active')).to.be.true;
        });

        it('activate a already activated Resource', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2,
                    active: true
                })
            ]);

            let action = {
                type: ACTIVATE,
                index: 0
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('active')).to.be.true;
        });

        it('activate a deactivate Resource and does not touch the active state of other resources', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2,
                    active: true
                }),
                Map({
                    name: 'resource2',
                    amount: 2,
                    active: false
                }),
                Map({
                    name: 'resource3',
                    amount: 2,
                    active: false
                })
            ]);

            let action = {
                type: ACTIVATE,
                index: 1
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('active')).to.be.true;
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('active')).to.be.true;
            expect(shouldState.get(2).get('name')).to.equal('resource3');
            expect(shouldState.get(2).get('active')).to.be.false;
        });
        it('activate a already activated Resource and does not touch the active state of other resources', () => {
            let state = List([
                Map({
                    name: 'resource1',
                    amount: 2,
                    active: true
                }),
                Map({
                    name: 'resource2',
                    amount: 2,
                    active: true
                }),
                Map({
                    name: 'resource3',
                    amount: 2,
                    active: false
                })
            ]);

            let action = {
                type: ACTIVATE,
                index: 1
            };
            let shouldState = resourceReducer(state, action);

            expect(shouldState.get(0).get('name')).to.equal('resource1');
            expect(shouldState.get(0).get('active')).to.be.true;
            expect(shouldState.get(1).get('name')).to.equal('resource2');
            expect(shouldState.get(1).get('active')).to.be.true;
            expect(shouldState.get(2).get('name')).to.equal('resource3');
            expect(shouldState.get(2).get('active')).to.be.false;
        });
    });


    it('without any type', () => {
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
