import { expect } from 'chai';
import ResourceButtonList from '../../../src/components/Resource/ResourceButtonList';
import ResourceButton from '../../../src/components/Resource/ResourceButton';
import TestUtils from 'react-addons-test-utils';
import { Map, List } from 'immutable';
import React from 'react'

function setup() {
  let props = {
    onClick: function () { },
    resources: List([
      Map({
        name: 'Test1',
        amount: 2
      }),
      Map({
        name: 'Test2',
        amount: 1
      })
    ])
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<ResourceButtonList {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('ResourceButtonList Component', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(output.type).to.equal('div');

    expect(output.props.children.get(0).type).to.equal(ResourceButton)
    expect(output.props.children.get(0).props.resource).to.instanceof(Map);
    expect(output.props.children.get(0).props.resource.get('name')).to.equal('Test1');
    expect(output.props.children.get(0).props.resource.get('amount')).to.equal(2);

    expect(output.props.children.get(1).type).to.equal(ResourceButton)
    expect(output.props.children.get(1).props.resource).to.instanceof(Map);
    expect(output.props.children.get(1).props.resource.get('name')).to.equal('Test2');
    expect(output.props.children.get(1).props.resource.get('amount')).to.equal(1);

  });
});