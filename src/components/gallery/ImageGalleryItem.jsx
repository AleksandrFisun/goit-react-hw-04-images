import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
export default function ImageGalleryItem({ webformatURL, index, openModal }) {
  return (
    <Item>
      <Img src={webformatURL} onClick={() => openModal(index)} alt="" />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  index: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
