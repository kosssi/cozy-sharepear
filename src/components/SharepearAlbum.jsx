import React from 'react';
import SharepearPictureGrid from './SharepearPictureGrid';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class SharepearAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {};
  }
  componentWillReceiveProps() {
    this.setGridSizes();
  }
  getGridSizes() {
    console.log("getGridSizes");
    return {
      gridWidth: document.body.clientWidth - 2 * 6 - 15,
      gridHeight: window.innerHeight
    };
  }
  setGridSizes() {
    this.setState(this.getGridSizes());
  }
  componentWillMount() {
    this.setGridSizes();
  }
  componentDidMount() {
    window.addEventListener("resize", this.setGridSizes.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setGridSizes.bind(this));
  }
  render() {
    return <section className="album">
      <h1>{this.props.title}</h1>
      <SharepearPictureGrid
        pictures={this.props.pictures}
        gridWidth={this.state.gridWidth}
        gridHeight={this.state.gridHeight} />
    </section>
  }
}

export default SharepearAlbum;
