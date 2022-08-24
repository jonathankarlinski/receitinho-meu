import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: '0',
      } }
    >
      <Link to="/drinks">
        <img
          className="drinkIcon"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="Drink"
        />
      </Link>
      <Link to="/foods">
        <img
          className="mealIcon"
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="Meal"
        />
      </Link>
    </footer>
  );
}
