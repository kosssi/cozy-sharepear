import React from 'react';
import SharepearAlbum from './SharepearAlbum';

export default class SharepearApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDimensions();
  }
  getDimensions() {
    return {
      viewportWidth: document.body.clientWidth - 2 * 6,
      idealHeight: parseInt(window.innerHeight / 2, 10)
    };
  }
  setDimensions() {
    window.setTimeout(() => {
      this.setState(this.getDimensions());
    }, 2000);
  }
  componentWillMount() {
    this.setDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.setDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions.bind(this));
  }
  render() {
    return <div>
      <section className="sharepear">
        <section className="main">
          <SharepearAlbum
            viewportWidth={this.state.viewportWidth}
            idealHeight={this.state.idealHeight}
            pictures={this.props.pictures} />
        </section>
      </section>
    </div>
  }
};
