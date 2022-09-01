import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  const type = useMemo(() => ({
    route: location.pathname.includes('foods') ? '/foods' : '/drinks',
    path: location.pathname.includes('foods') ? 'meal' : 'cocktail',
    name: location.pathname.includes('foods') ? 'Meal' : 'Drink',
  }), [location.pathname]);

  useEffect(() => {
    setIsFavorite(
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]').some((item) => (
        item.id === id
      )),
    );
  }, []);

  const handleFavorite = () => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const curr = {
      id: recipe[`id${type.name}`],
      type: location.pathname.includes('foods') ? 'food' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${type.name}`],
      image: recipe[`str${type.name}Thumb`],
    };

    if (isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favoriteItems.filter((item) => (
          item.id !== id
        )),
      ));

      setIsFavorite(false);

      return;
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...favoriteItems,
      curr,
    ]));

    setIsFavorite(true);
  };

  return (
    <button
      type="button"
      onClick={ () => handleFavorite() }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt=" favorite"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};
