import { expect } from 'chai';
import ResourceButton from '../../../src/components/Resource/ResourceButton';
import TestUtils from 'react-addons-test-utils';
import { Map } from 'immutable';
import React from 'react'

function setup() {
  let props = {
    onClick: function () { },
    resource: Map({
      name: 'Test1',
      amount: 2
    }),
    className: 'blubb'
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<ResourceButton {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('ResourceButton Component', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(output.type).to.equal('button');
    expect(output.props.className).to.equal('blubb')
    expect(output.props.children[0]).to.equal('Test1')
    expect(output.props.children[2]).to.equal(2)
  });
});