import { Component } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from './API/Api';
import { Searchbar } from './searchbar/Searchbar';
import ImageGallery from './gallery/ImageGallery';
import LoadMore from './loadMore/LoadMore';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import style from './App.module.css';

export class App extends Component {
  state = {
    values: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
  };
  requestSearch = value => {
    this.setState({ values: value, page: 1, images: [] });
  };
  async componentDidUpdate(_, prevState) {
    const prePage = prevState.page;
    const preValues = prevState.values;
    const { values, page, images } = this.state;
    if (prePage !== page || preValues !== values) {
      try {
        this.setState({ isLoading: true });
        const response = fetchImages(values, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Ничего не найдено')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }
  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { toggleModal, openModal, nextPage } = this;
    const { images, isLoading, largeImage, showModal } = this.state;
    return (
      <div className={style.Wraper}>
        <ToastContainer />
        <Searchbar onSubmit={this.requestSearch} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        <div className={style.LoadeMore}>
          {isLoading && <Loader />}
          {images.length >= 12 && <LoadMore nextPage={nextPage} />}
        </div>
      </div>
    );
  }
}
