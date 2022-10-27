import ImageGalleryItem from './ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal, tags }) {
  return (
    <List>
      {images.map(({ id, webformatURL, tags }, index) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          index={index}
          openModal={openModal}
          tags={tags}
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
      tags: PropTypes.string.isRequired,
    })
  ),
};
