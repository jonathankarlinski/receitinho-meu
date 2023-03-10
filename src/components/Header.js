import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ search, title }) {
  return (
    <header>
      <h1 data-testid="page-title">
        {title}
      </h1>
      <Link to="/profile">
        <img
          className="profileIcon"
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile"
        />
      </Link>
      {search && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  search: true,
};
