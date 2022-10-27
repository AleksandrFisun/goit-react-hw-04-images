import { Component } from 'react';
import { ModalWindow, Overlay, Description, Text, Img } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    e.code === 'Escape' && this.props.toggleModal();
  };

  handleBackdropClick = e => {
    e.target === e.currentTarget && this.props.toggleModal();
  };

  render() {
    const { handleBackdropClick } = this;
    const { largeImage, user, views, likes } = this.props;
    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <Img src={largeImage} alt="" />
          <Description>
            <Text>Имя пользователя: {user} </Text>
            <Text>Просмотры: {views} </Text>
            <Text>Лайки: {likes} </Text>
          </Description>
        </ModalWindow>
      </Overlay>
    );
  }
}
