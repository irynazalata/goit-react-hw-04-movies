import React, { Component } from 'react';

import baseHttpService from '../../services/moviesApi';
import styles from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    baseHttpService.fetchMovieCast(movieId).then(({ cast }) => {
      this.setState({ cast });
    });
  }
  render() {
    const { cast } = this.state;

    console.log(cast.profile_path);

    console.log(cast);
    if (cast) {
      const items = cast.map(cast => {
        let img;
        cast.profile_path
          ? (img = `https://image.tmdb.org/t/p/w300/${cast.profile_path}`)
          : (img =
              'https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg');
        return (
          <li key={cast.id} className={styles.listItem}>
            <img src={img} alt={cast.name} className={styles.img} />
            <h3 className={styles.title}>{cast.name}</h3>
            <p>Character: {cast.character}</p>
          </li>
        );
      });
      return <ul className={styles.list}>{items}</ul>;
    }
  }
}
export default Cast;
