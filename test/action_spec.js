import { expect } from 'chai';
import { INCREASE, DECREASE, ACTIVATE, increase, decrease, activate } from '../src/actions/resource'

describe('actions', () => {
    it('should create an action to increase a resource', () => {
        let index = 0;
        let value = 4;

        let expectAction = {
            type: INCREASE,
            index,
            value
        }

        expect(increase(index, value)).to.deep.equal(expectAction);
    });

    it('should create an action to decrease a resource', () => {
        let index = 0;
        let value = 1;

        let expectAction = {
            type: DECREASE,
            index,
            value
        }

        expect(decrease(index, value)).to.deep.equal(expectAction);
    });

    it('should create an action to activate a resource', () => {
        let index = 1;

        let expectAction = {
            type: ACTIVATE,
            index
        }

        expect(activate(index)).to.deep.equal(expectAction);
    });
});