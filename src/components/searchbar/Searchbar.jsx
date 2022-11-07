import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';
import styled from './Searchbar.module.css';

const initialValues = {
  search: '',
};

export default function Searchbar({ onSubmit }) {
  const [imagesName, setImagesName] = useState('');
  const changeHandler = event => {
    setImagesName(event.target.value.toLowerCase());
  };
  const handleSubmit = () => {
    // console.log(imagesName);
    // console.log(setImagesName);
    // console.log(e.search);
    // setImagesName(e.search);
    if (!imagesName) {
      return toast.error('Поле ввода пустое!');
    } else if (imagesName.length <= 2) {
      toast.error('Введите более 2 символов!');
      return;
    }
    onSubmit(imagesName);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div className={styled.Wraper}>
        <Form className={styled.SearchForm} autoComplete="off">
          <button className={styled.SearchFormButton} type="submit">
            <AiOutlineSearch />
          </button>
          <Field
            className={styled.Input}
            type="text"
            name="search"
            value={imagesName}
            onChange={changeHandler}
          />
        </Form>
      </div>
    </Formik>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
