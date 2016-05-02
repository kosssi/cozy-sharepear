import React from 'react';
import SharepearPicture from './SharepearPicture';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LinearPartitioning from 'linear-partitioning';
import {List} from 'immutable';

export default class SharepearAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {};
    this.setPicturesWithRatio();
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
    const summedWidth = this.state.pictures.reduce((sum, picture) =>
      sum += picture.get('ratio') * this.props.idealHeight
    , 0);
    const rows = Math.round(summedWidth / this.props.viewportWidth);
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
          .set('calculatedWidth', parseInt(this.props.viewportWidth / summedRatios * picture.get('ratio'), 10))
          .set('calculatedHeight', parseInt(this.props.viewportWidth / summedRatios, 10))
        );
      }
      indexStart = indexEnd;
    });
  }
  render() {
    return <section className="album">
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
};
