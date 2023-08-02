import React, { Component } from 'react';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return <ul className={style.imageGallery}>{this.props.children}</ul>;
  }
}

export default ImageGallery;
