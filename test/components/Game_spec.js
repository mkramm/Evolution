import { expect } from 'chai';
import ResourceButtonList from '../../src/containers/Resource/ResourceButtonList';
import Game from '../../src/components/Game'
import TestUtils from 'react-addons-test-utils';
import { Map, List } from 'immutable';
import React from 'react'

function setup() {
  let props = {
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Game {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Game Component', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(output.type).to.equal('div');

    let resourceButtonList = output.props.children;
    expect(resourceButtonList.type).to.equal(ResourceButtonList);
  });
});