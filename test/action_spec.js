import { expect } from 'chai';
import { INCREASE, increase } from '../src/actions/index'

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
});