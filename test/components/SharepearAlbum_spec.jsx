import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SharepearAlbum from '../../src/components/SharepearAlbum';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass} = TestUtils;

describe('SharepearAlbum', () => {
  it('display a sharepear album', () => {
    const viewportWidth = 1000;
    const idealHeight = 333;
    const pictures = List.of(
      Map({id: 0, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 1, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 2, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 3, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 4, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 5, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 6, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 7, url: 'http://example.org/800/120', width: 800, height: 1200}),
      Map({id: 8, url: 'http://example.org/800/600', width: 800, height: 600}),
      Map({id: 9, url: 'http://example.org/800/600', width: 800, height: 600})
    );
    const component = renderIntoDocument(
      <SharepearAlbum
        viewportWidth={viewportWidth}
        idealHeight={idealHeight}
        pictures={pictures}
      />
    );
    const elements = scryRenderedDOMComponentsWithClass(component, 'picture');
    expect(elements.length).to.equal(10);

    // partitions is equal to:
    // [ [ 133, 133 ], [ 133, 133 ], [ 133, 133, 133 ], [ 66, 133, 133 ] ]

    for (let i=0; i < 4; i++) {
      expect(elements[i].style['background-image'])
        .to.equal('url(http://example.org/800/600)');
      expect(elements[i].style.width).to.equal('500px');
      expect(elements[i].style.height).to.equal('375px');
    }

    for (let i=4; i < 7; i++) {
      expect(elements[i].style['background-image'])
        .to.equal('url(http://example.org/800/600)');
      expect(elements[i].style.width).to.equal('333.33px');
      expect(elements[i].style.height).to.equal('250px');
    }

    expect(elements[7].style['background-image'])
      .to.equal('url(http://example.org/800/120)');
    expect(elements[7].style.width).to.equal('200px');
    expect(elements[7].style.height).to.equal('300px');


    for (let i=8; i < 10; i++) {
      expect(elements[i].style['background-image'])
        .to.equal('url(http://example.org/800/600)');
      expect(elements[i].style.width).to.equal('400px');
      expect(elements[i].style.height).to.equal('300px');
    }
  });
});
