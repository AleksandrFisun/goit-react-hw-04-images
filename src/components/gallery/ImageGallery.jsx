import ImageGalleryItem from './ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal }) {
  return (
    <List>
      <ImageGalleryItem images={images} openModal={openModal} />
    </List>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func,
};
