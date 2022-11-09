import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay, Img } from './Modal.styled';

export default function Modal({ largeImage, toggleModal }) {
  const handleKeyDown = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      toggleModal();
    }
  };
  useEffect(() => {
    const onEsc = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [toggleModal]);

  return (
    <Overlay onClick={handleKeyDown}>
      <ModalWindow>
        <Img src={largeImage} alt="" />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
