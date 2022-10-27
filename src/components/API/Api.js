import PropTypes from 'prop-types';
import axios from 'axios';
const KEY = '29549737-0e26c7f130412282b7a563f88';
export default function fetchImages(searchQuery, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
