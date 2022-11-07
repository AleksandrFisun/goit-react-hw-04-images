import { Item, Img } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

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
  images: propTypes.array,
  onClick: propTypes.func,
};
