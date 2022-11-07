import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from './API/Api';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './gallery/ImageGallery';
import LoadMore from './loadMore/LoadMore';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import style from './App.module.css';

export default function App() {
  const [imagesName, setImagesName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestSearch = value => {
    if (value === imagesName) {
      toast.error('Введите новый запрос');
      return;
    }
    setImagesName(value);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    async function fetchImages() {
      if (!imagesName) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await getImages(imagesName, page);
        setError(false);
        if (response.hits.length === 0) {
          toast.error('Ничего не найдено');
          setImages([]);
          setIsLoading(false);
          setError(true);
          return;
        }
        setImages(prev => {
          return [...prev, ...response.hits];
        });
      } catch (error) {
        setError(true);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [imagesName, page]);

  const openModal = largeImage => {
    setShowModal(true);
    setLargeImage(largeImage.largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const nextPage = () => {
    setPage(pre => pre + 1);
    return;
  };

  return (
    <div className={style.Wraper}>
      <ToastContainer />
      <Searchbar onSubmit={requestSearch} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      <div className={style.LoadeMore}>
        <div className={style.Loader}>{isLoading && <Loader />}</div>
        {images.length >= 12 && <LoadMore nextPage={nextPage} />}
      </div>
    </div>
  );
}
