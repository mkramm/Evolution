import { expect } from 'chai';
import ResearchButton from '../../../src/components/Research/Button';
import TestUtils from 'react-addons-test-utils';
import { Map } from 'immutable';
import React from 'react'

function setup() {
    let props = {
        name: 'Use Your Brain',
        onClick: function () { }
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<ResearchButton {...props} />)
    let output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer
    }
}

describe('ResearchButton Component', () => {
    it('should render correctly', () => {
        const { output } = setup();

        expect(output.type).to.equal('button');
        expect(output.props.children).to.equal('Use Your Brain')
    });
});