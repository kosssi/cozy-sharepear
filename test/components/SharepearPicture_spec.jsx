import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SharepearPicture from '../../src/components/SharepearPicture';
import {expect} from 'chai';

const {renderIntoDocument, findRenderedDOMComponentWithTag} = TestUtils;

describe('SharepearPicture', () => {
  it('display a sharepear picture', () => {
    const url = 'example.org';
    const calculatedWidth = 400;
    const calculatedHeight = 300;
    const component = renderIntoDocument(
      <SharepearPicture
        url={url}
        calculatedWidth={calculatedWidth}
        calculatedHeight={calculatedHeight}
      />
    );
    const picture = findRenderedDOMComponentWithTag(component, 'div');
    expect(picture.style.width).to.equal(calculatedWidth + 'px');
    expect(picture.style.height).to.equal(calculatedHeight + 'px');
    expect(picture.style['background-image']).to.equal('url(' + url + ')');
  });
});
