import React from 'react';
import SharepearPicture from './SharepearPicture';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LinearPartitioning from 'linear-partitioning';
import {List} from 'immutable';

class SharepearPictureGrid extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {};
    this.setPicturesWithRatio();
    this.setPicturesWithSizes();
  }
  componentWillReceiveProps() {
    this.setPicturesWithSizes();
  }
  setPicturesWithRatio() {
    this.state.pictures = List();
    this.props.pictures.forEach((picture) => {
      this.state.pictures = this.state.pictures.push(
        picture.set('ratio', picture.get('width') / picture.get('height'))
      );
    });
  }
  setPicturesWithSizes() {
    const width = this.props.gridWidth;
    const height = Math.round(this.props.gridHeight / 2 * 100) / 100;

    const summedWidth = this.state.pictures.reduce((sum, picture) =>
      sum += picture.get('ratio') * height
    , 0);
    const rows = Math.round(summedWidth / width);
    const weights = this.state.pictures.map((picture) =>
      parseInt(picture.get('ratio') * 100)
    );
    const partitions = LinearPartitioning(weights.toArray(), rows);

    var indexStart = 0;
    partitions.forEach((row) => {
      var indexEnd = indexStart + row.length;
      const summedRatios = this.state.pictures
        .filter((picture, index) => {
          return index >= indexStart && index < indexEnd
        })
        .reduce((sum, picture) => {
          return sum += picture.get('ratio');
        }, 0);
      for (let i=indexStart; i < indexEnd; i++) {
        var picture = this.state.pictures.get(i);
        this.state.pictures = this.state.pictures.set(i, picture
          .set('calculatedWidth', Math.round(width / summedRatios * picture.get('ratio') * 100) / 100)
          .set('calculatedHeight', Math.round(width / summedRatios * 100) / 100)
        );
      }
      indexStart = indexEnd;
    });
  }
  render() {
    return <section className="picture-grid">
      {this.state.pictures.map(picture =>
        <SharepearPicture
          key={picture.get('id')}
          url={picture.get('url')}
          width={picture.get('width')}
          height={picture.get('height')}
          calculatedWidth={picture.get('calculatedWidth')}
          calculatedHeight={picture.get('calculatedHeight')}
          ratio={picture.get('ratio')} />
        )}
    </section>
  }
}

export default SharepearPictureGrid;
