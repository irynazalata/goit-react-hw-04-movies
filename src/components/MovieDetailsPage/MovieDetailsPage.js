import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import baseHttpService from '../../services/moviesApi';
import styles from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  state = {
    movie: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    baseHttpService.fetchMovieDetails(movieId).then(movie => {
      this.setState({ movie });
    });
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    if (location.state) {
      history.goBack();
      return;
    }

    this.props.history.push('/');
  };

  render() {
    const { movie } = this.state;
    const date = Number.parseInt(movie.release_date);
    let genres;
    if (movie.genres) {
      genres = movie.genres.map(genre => genre.name).join(' ');
    }
    return (
      movie && (
        <div className="container">
          <button
            type="button"
            onClick={this.handleGoBack}
            className={styles.btn}
          >
            Go Back
          </button>
          <div className={styles.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              className={styles.poster}
              alt={movie.title}
            />
            <div>
              <h2 className={styles.name}>
                {movie.title}({date})
              </h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{genres}</p>
            </div>
          </div>
          <div className={styles.container}>
            <h2 className={styles.title}>Additional information</h2>
            <ul className={styles.linkBox}>
              <li>
                <NavLink
                  exact
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                  }}
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                  }}
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )
    );
  }
}

export default MovieDetailsPage;
