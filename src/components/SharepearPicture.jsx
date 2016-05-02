import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class SharepearPicture extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getStyle() {
    return {
      backgroundImage: 'url(' + this.props.url + ')',
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    };
  }
  render() {
    return <div className="picture" style={this.getStyle()}></div>
  }
};
