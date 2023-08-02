import React, { Component } from 'react';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from './service/servise';
import axios from 'axios';
import Notiflix from 'notiflix';

import Button from './Button/Button';
import ImageGalleryList from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader.';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
class App extends Component {
  state = {
    name: '',
    largeImageURL: '',
    page: 1,
    hits: [],
    totalHits: 0,
    isLoading: false,
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.getImages();
    }
  }
  getImages = () => {
    const { name, page } = this.state;
    this.setState({ isLoading: true });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          }
          const modifiedHits = response.data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          this.setState(prevState => ({
            hits: [...prevState.hits, ...modifiedHits],
            totalHits: response.data.totalHits,
            isLoading: false,
          }));
        });
    } catch (error) {
      console.error(error.message);
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = ({ name }) => {
    this.setState({ name, page: 1, hits: [], totalHits: 0 });
  };

  handleImageClick = (imageURL, tag) => {
    this.setState({ showModal: true, largeImageURL: imageURL });
  };
  buttonLoadClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalClick = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { largeImageURL, hits, totalHits, isLoading, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.hits.length !== 0 && (
          <ImageGalleryList>
            <ImageGalleryItem images={hits} onImage={this.handleImageClick} />
          </ImageGalleryList>
        )}
        {showModal && (
          <Modal onClose={this.handleModalClick}>
            <img src={largeImageURL} alt="Modal" />
          </Modal>
        )}
        {isLoading && <Loader />}
        {totalHits > 0 && hits.length < totalHits && (
          <Button onBtnClick={this.buttonLoadClick} />
        )}
      </>
    );
  }
}

export default App;
