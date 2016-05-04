import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import SharepearApp from './components/SharepearApp';

var css = require('./style/main.styl');

const pictures = List.of(
    Map({id: 1, url: 'images/1.jpg', width: 800, height: 600}),
    Map({id: 2, url: 'images/2.jpg', width: 800, height: 600}),
    Map({id: 3, url: 'images/3.jpg', width: 800, height: 600}),
    Map({id: 4, url: 'images/4.jpg', width: 800, height: 600}),
    Map({id: 5, url: 'images/5.jpg', width: 800, height: 600}),
    Map({id: 6, url: 'images/6.jpg', width: 800, height: 600}),
    Map({id: 7, url: 'images/7.jpg', width: 800, height: 600}),
    Map({id: 8, url: 'images/8.jpg', width: 800, height: 600}),
    Map({id: 9, url: 'images/9.jpg', width: 800, height: 600}),
    Map({id: 10, url: 'images/10.jpg', width: 800, height: 1200}),
    Map({id: 11, url: 'images/11.jpg', width: 800, height: 600}),
    Map({id: 12, url: 'images/12.jpg', width: 800, height: 600})
);

ReactDOM.render(
  <SharepearApp pictures={pictures} />,
  document.getElementById('app')
);
