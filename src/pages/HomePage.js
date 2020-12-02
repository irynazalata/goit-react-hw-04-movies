import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ImageLoader from '../shared/Loader/Loader';

import baseHttpService from '../services/moviesApi';

class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    baseHttpService
      .fetchPopularMovies()
      .then(({ results }) => {
        this.setState({ movies: results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading } = this.state;
    const items = movies.map(movie => {
      let name = movie.title || movie.name;
      return (
        <li className="list-item" key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: this.props.location },
            }}
          >
            {name}
          </Link>
        </li>
      );
    });
    return (
      <>
        <div className="navigation-link-container">
          <NavLink
            exact
            to="/"
            className="navigation-link"
            activeClassName="navigation-link-active"
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation-link"
            activeClassName="navigation-link-active"
          >
            Movies
          </NavLink>
        </div>
        <div className="container">
          <h2 className="title">Trending today</h2>
          {loading && <ImageLoader />}
          <ul className="list">{items}</ul>
        </div>
      </>
    );
  }
}

export default HomePage;
