import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';
import styled from './Searchbar.module.css';

const initialValues = {
  search: '',
};

export class Searchbar extends Component {
  handleSubmit = searchValue => {
    const value = searchValue.search;
    if (!value) {
      return toast.error('Поле ввода пустое!');
    } else if (value.length <= 2) {
      toast.error('Введите более 2 символов!');
      return;
    } else if (value === initialValues.value) {
      console.log('asdasd');
    }
    this.props.onSubmit(value);
  };

  render() {
    return (
      <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
        <div className={styled.Wraper}>
          <Form className={styled.SearchForm} autoComplete="off">
            <button className={styled.SearchFormButton} type="submit">
              <AiOutlineSearch />
            </button>
            <Field className={styled.Input} type="text" name="search" />
          </Form>
        </div>
      </Formik>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
