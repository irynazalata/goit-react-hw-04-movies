import React, { Component } from 'react';

import baseHttpService from '../../services/moviesApi';
import styles from './Reviews.module.css';

class Cast extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    baseHttpService.fetchMovieReviews(movieId).then(({ results }) => {
      this.setState({ reviews: results });
    });
  }
  render() {
    const { reviews } = this.state;

    console.log(reviews);
    if (reviews.length > 0) {
      const items = reviews.map(review => {
        return (
          <li className={styles.listItem}>
            <h3 className={styles.title}>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        );
      });
      return <ul className={styles.list}>{items}</ul>;
    } else {
      return (
        <p className={styles.noInfo}>
          We don't have any reviews for this movie
        </p>
      );
    }
  }
}

export default Cast;
