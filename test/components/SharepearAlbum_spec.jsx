import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SharepearAlbum from '../../src/components/SharepearAlbum';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
  scryRenderedDOMComponentsWithTag} = TestUtils;

describe('SharepearAlbum', () => {
  it('renders a list with only the active items if the filter is active', () => {
    const pictures = List.of(
      Map({id: 1, url: 'http://test.org/400/200', width: 400, height: 200}),
      Map({id: 2, url: 'http://test.org/400/200', width: 400, height: 200}),
      Map({id: 3, url: 'http://test.org/400/200', width: 400, height: 200})
    );
    const component = renderIntoDocument(
      <SharepearAlbum pictures={pictures} />
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(items.length).to.equal(3);
  });
});
