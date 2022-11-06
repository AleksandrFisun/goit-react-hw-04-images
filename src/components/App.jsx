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
import { useEffect } from 'react';

export const App = () => {
  const [values, setValues] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [user, setUser] = useState('');
  const [views, setViews] = useState('');
  const [likes, setLikes] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestSearch = value => {
    if (value === this.state.values) {
      toast.error('Введите новый запрос');
      return;
    }
    setValues({ values: value, page: 1, images: [] });
  };

  useEffect(() => {
    if (setPage !== page || setValues !== values) {
      try {
        setIsLoading(true);
        const response = fetchImages(values, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Ничего не найдено')
            : data.data.hits.forEach(
                ({
                  id,
                  webformatURL,
                  largeImageURL,
                  user,
                  likes,
                  views,
                  tags,
                }) => {
                  !images.some(image => image.id === id) &&
                    setImages(({ images }) => ({
                      images: [
                        ...images,
                        {
                          id,
                          webformatURL,
                          largeImageURL,
                          user,
                          likes,
                          views,
                          tags,
                        },
                      ],
                    }));
                }
              );
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading({ error, isLoading: false });
      } finally {
      }
    }
  });
  const openModal = index => {
    setImages(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
      user: images[index].user,
      likes: images[index].likes,
      views: images[index].views,
      tags: images[index].tags,
    }));
  };

  const toggleModal = () => {
    setShowModal(({ showModal }) => ({ showModal: !showModal }));
  };
  const nextPage = () => {
    setPage(({ page }) => ({ page: page + 1 }));
  };

  return (
    <div className={style.Wraper}>
      <ToastContainer />
      <Searchbar onSubmit={requestSearch} />
      {images.length !== 0 && (
        <ImageGallery images={images} tags={tags} openModal={openModal} />
      )}
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          largeImage={largeImage}
          user={user}
          views={views}
          likes={likes}
          tags={tags}
        />
      )}
      <div className={style.LoadeMore}>
        <div className={style.Loader}>{isLoading && <Loader />}</div>
        {images.length >= 12 && <LoadMore nextPage={nextPage} />}
      </div>
    </div>
  );
};
