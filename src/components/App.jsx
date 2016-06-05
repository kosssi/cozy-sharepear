import React from 'react'
import NavLink from './NavLink'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
          <li><NavLink to="/album">Album</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App;
