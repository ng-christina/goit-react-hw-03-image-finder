import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onImage }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={style.galeryItem} key={id}>
          <img
            src={webformatURL}
            alt={tags}
            className={style.img}
            onClick={() => onImage(webformatURL)}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onImage: PropTypes.func,
};

export default ImageGalleryItem;
