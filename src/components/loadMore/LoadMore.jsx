import PropTypes from 'prop-types';
import styled from './LoadMore.module.css';

export default function LoadMore({ nextPage }) {
  return (
    <button className={styled.Button} type="button" onClick={nextPage}>
      Load more
    </button>
  );
}

LoadMore.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
