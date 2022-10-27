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
    user: '',
    views: '',
    likes: '',
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
            : data.data.hits.forEach(
                ({ id, webformatURL, largeImageURL, user, likes, views }) => {
                  !images.some(image => image.id === id) &&
                    this.setState(({ images }) => ({
                      images: [
                        ...images,
                        { id, webformatURL, largeImageURL, user, likes, views },
                      ],
                    }));
                }
              );
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
      user: images[index].user,
      likes: images[index].likes,
      views: images[index].views,
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
    const { images, isLoading, largeImage, user, views, likes, showModal } =
      this.state;
    return (
      <div className={style.Wraper}>
        <ToastContainer />
        <Searchbar onSubmit={this.requestSearch} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal
            toggleModal={toggleModal}
            largeImage={largeImage}
            user={user}
            views={views}
            likes={likes}
          />
        )}
        <div className={style.LoadeMore}>
          <div className={style.Loader}>{isLoading && <Loader />}</div>
          {images.length >= 12 && <LoadMore nextPage={nextPage} />}
        </div>
      </div>
    );
  }
}
