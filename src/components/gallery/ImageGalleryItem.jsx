import { Item, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, openModal }) => {
  const elements = images.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <Item key={id} onClick={() => openModal({ id, largeImageURL })}>
        <Img src={webformatURL} />
      </Item>
    );
  });
  return elements;
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
