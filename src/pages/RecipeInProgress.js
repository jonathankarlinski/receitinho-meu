import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchById } from '../services/searchAPI';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });

  const { id } = useParams();
  const location = useLocation();

  const type = useMemo(() => ({
    route: location.pathname.includes('foods') ? '/foods' : '/drinks',
    path: location.pathname.includes('foods') ? 'meal' : 'cocktail',
    name: location.pathname.includes('foods') ? 'Meal' : 'Drink',
  }), [location.pathname]);

  useEffect(() => {
    const fetchAPI = async () => {
      const item = await fetchById(id, type.path);

      console.log(item);

      setRecipe(item);
    };

    fetchAPI();
  }, [id]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${type.name}Thumb`] }
        alt={ recipe[`str${type.name}`] }
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${type.name}`] }
      </h1>
      <button data-testid="share-btn" type="button">
        Compartilhe
      </button>
      <button data-testid="favorite-btn" type="button">
        Favoritar
      </button>
      <p data-testid="recipe-category">
        { recipe.strCategory }
        &nbsp;
        { recipe.strAlcoholic }
      </p>
      { recipe.ingredients.map((ingredient, index) => (
        <div key={ index }>
          <label
            htmlFor={ `checkbox-${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <p>
              <strong>{ingredient.name}</strong>
              &nbsp;
              <span>{ingredient.qty}</span>
            </p>
            <input
              type="checkbox"
              id={ `checkbox-${index}` }
            />
          </label>
        </div>
      )) }
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <button data-testid="finish-recipe-btn" type="button">
        Finalizar Receita
      </button>
    </div>
  );
}
