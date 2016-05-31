import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, List } from 'immutable';
import { research, checkResearchCosts } from '../../../src/containers/Research/Button.jsx'

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Research Button Container', () => {
    describe('DISPATCH', () => {
        it('should dispatch action', () => {
            // initial state of the store
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 51,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 0,
                    amount: 50
                })
            });
            const actions = [
                { type: 'DECREASE', value: 50, index: 0 },
                { type: 'ACTIVATE', index: 1 }
            ]

            const store = mockStore(getState);
            research(getState.toJS(), store.dispatch);
            expect(store.getActions()).to.deep.equal(actions);
        });

        it('should not dispatch action', () => {
            // initial state of the store
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 1,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 0,
                    amount: 50
                })
            });
            const actions = [];

            const store = mockStore(getState);
            research(getState.toJS(), store.dispatch);
            expect(store.getActions()).to.deep.equal(actions);
        });
    });
    describe('CHECK', () => {
        it('should be false for lower amount for existing Type', () => {
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 1,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 0,
                    amount: 50
                })
            });

            expect(checkResearchCosts(getState.toJS())).to.be.false;
        });

        it('should be true for equal amount for existing Type', () => {
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 50,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 0,
                    amount: 50
                })
            });

            expect(checkResearchCosts(getState.toJS())).to.be.true;
        });

        it('should be true for higher amount for existing Type', () => {
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 53,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 0,
                    amount: 50
                })
            });

            expect(checkResearchCosts(getState.toJS())).to.be.true;
        });

        it('should be false for higher amount for not existing Type', () => {
            const getState = Map({
                resources: List([
                    Map({
                        name: 'resource1',
                        amount: 53,
                        active: true
                    }),
                    Map({
                        name: 'resource2',
                        amount: 0,
                        active: false
                    })
                ]),
                research: Map({
                    type: 2,
                    amount: 50
                })
            });
            expect(getState.toJS().resources[2]).to.be.undefined;
            expect(checkResearchCosts(getState.toJS())).to.be.false;
        });
    });
});
