import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import queryString from 'query-string';
import ImageLoader from '../shared/Loader/Loader';

import baseHttpService from '../services/moviesApi';
import '../index.css';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    loading: false,
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      baseHttpService.fetchMoviesWithQuery(query).then(({ results }) => {
        this.setState({ movies: results });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = queryString.parse(prevProps.location.search);
    const { query: nextQuery } = queryString.parse(this.props.location.search);
    if (prevQuery !== nextQuery) {
      baseHttpService.fetchMoviesWithQuery(nextQuery).then(({ results }) => {
        this.setState({ movies: results, loading: false });
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.query}`,
    });
    baseHttpService
      .fetchMoviesWithQuery(this.state.query)
      .then(({ results }) => {
        this.setState({ movies: results });
      });
  };

  render() {
    const { query, movies, loading } = this.state;
    const items = movies.map(movie => {
      let name = movie.title || movie.name;
      return (
        <li className="list-item" key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: this.props.location, query: query },
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
        <div>
          <form onSubmit={this.handleSubmit} className="form">
            <label className="label">
              <input
                type="text"
                value={query}
                name="query"
                onChange={this.handleChange}
                placeholder="Enter the movie"
                className="input"
                required
              />
            </label>
            <input type="submit" value="Search" className="button" />
          </form>
        </div>
        {loading && <ImageLoader />}
        <ul className="list">{items}</ul>
      </>
    );
  }
}

export default MoviesPage;
