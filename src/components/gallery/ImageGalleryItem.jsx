import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
export default function ImageGalleryItem({
  webformatURL,
  index,
  openModal,
  tags,
}) {
  return (
    <Item>
      <Img src={webformatURL} onClick={() => openModal(index)} alt={tags} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  index: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
