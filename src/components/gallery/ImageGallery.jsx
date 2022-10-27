import ImageGalleryItem from './ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal }) {
  return (
    <List>
      {images.map(({ id, webformatURL }, index) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          index={index}
          openModal={openModal}
        />
      ))}
    </List>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
