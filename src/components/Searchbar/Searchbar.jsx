import style from './Searchbar.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { FcSearch } from 'react-icons/fc';

class Searchbar extends Component {
  state = {
    name: '',
  };
  handleChange = evt => {
    this.setState({ name: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name.trim() === '') {
      Notiflix.Notify.failure('Please enter search words!');
      return;
    }
    this.props.onSubmit(this.state);
    this.setState({ name: '' });
  };
  reset() {
    this.setState({ name: '' });
  }
  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
          <button type="submit" className={style.searchFormButton}>
            <span className={style.buttonLabel}>Search</span>
            <FcSearch className={style.fc} />
          </button>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
