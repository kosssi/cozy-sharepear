import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import css from './style/main.styl';


import App from './components/App'
import SharepearApp from './components/SharepearApp'
import About from './components/About'
import Repos from './components/Repos'
import Repo from './components/Repo'
import Home from './components/Home'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/album" component={SharepearApp}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'));
