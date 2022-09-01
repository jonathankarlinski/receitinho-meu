import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
  }, []);

  useEffect(() => {
    console.log(favoriteRecipes);
  }, [favoriteRecipes]);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        search={ false }
      />
      <p data-testid="filter-by-all-btn" />
      <p data-testid="filter-by-food-btn" />
      <p data-testid="filter-by-drink-btn" />
      { favoriteRecipes.map((recipe, index) => (
        <>
          <img data-testid={ `${index}-horizontal-image` } src={ recipe.image } alt="" />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality}
            &nbsp;
            -
            &nbsp;
            {recipe.category}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            Favorite
          </button>
        </>
      )) }

    </div>
  );
}
