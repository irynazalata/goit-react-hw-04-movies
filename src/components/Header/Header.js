import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.navigationLinkContainer}>
      <NavLink
        exact
        to={routes.home}
        className={styles.navigationLink}
        activeClassName={styles.navigationLinkActive}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.movies}
        className={styles.navigationLink}
        activeClassName={styles.navigationLinkActive}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
