import React from 'react';
import SharepearAlbum from './SharepearAlbum';

export default class SharepearApp extends React.Component {
  render() {
    return <div>
      <section className="sharepear">
        <section className="main">
          <SharepearAlbum
            viewportWidth={this.props.viewportWidth}
            idealHeight={this.props.idealHeight}
            pictures={this.props.pictures} />
        </section>
      </section>
    </div>
  }
};
