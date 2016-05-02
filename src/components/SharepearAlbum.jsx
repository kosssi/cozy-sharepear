import React from 'react';
import SharepearPicture from './SharepearPicture';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LinearPartitioning from 'linear-partitioning';

export default class SharepearAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {
      picturesWithSizes: this.getPicturesWithSizes()
    };
  }
  getPicturesWithSizes() {
    const summedWidth = this.props.pictures.reduce((sum, picture) =>
      sum += picture.get('ratio') * this.props.idealHeight
    , 0);
    const rows = Math.round(summedWidth / this.props.viewportWidth);
    const weights = this.props.pictures.map((picture) =>
      parseInt(picture.get('ratio') * 100)
    );
    const partitions = LinearPartitioning(weights.toArray(), rows);

    var index = 0;
    var picturesWithSizes = [];
    partitions.forEach((row) => {
      var rowBuffer = [];
      row.forEach(() => rowBuffer.push(this.props.pictures.get(index++)));
      const summedRatios = rowBuffer.reduce((sum, picture) =>
        sum += picture.get('ratio')
      , 0);
      rowBuffer.forEach((picture) => {
        console.log(this.props.viewportWidth, summedRatios, picture.get('ratio'));
        const width = parseInt(this.props.viewportWidth / summedRatios * picture.get('ratio'), 10);
        const height = parseInt(this.props.viewportWidth / summedRatios, 10);
        picturesWithSizes.push({picture: picture, width: width, height: height});
      });
    });

    return picturesWithSizes;
  }
  render() {
    return <section className="album">
      {this.state.picturesWithSizes.map(pictureWithSize =>
        <SharepearPicture
          key={pictureWithSize.picture.get('id')}
          url={pictureWithSize.picture.get('url')}
          width={pictureWithSize.width}
          height={pictureWithSize.height}
          ratio={pictureWithSize.picture.get('ratio')} />
        )}
    </section>
  }
};
