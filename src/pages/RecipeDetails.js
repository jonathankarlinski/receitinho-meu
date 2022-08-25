import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchById } from '../services/searchAPI';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });

  const { id } = useParams();
  const location = useLocation();

  const type = useMemo(() => ({
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
  }, []);

  return (
    <div>
      <img
        src={ recipe[`str${type.name}Thumb`] }
        alt={ recipe[`str${type.name}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${type.name}`] }
      </h1>
      <p data-testid="recipe-category">
        { recipe.strCategory }
        &nbsp;
        { recipe.strAlcoholic }
      </p>
      { recipe.ingredients.map((ingredient, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            <strong>{ingredient.name}</strong>
            &nbsp;

            <span>{ingredient.qty}</span>
          </p>
        </div>
      )) }
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      { recipe.strYoutube && (
        <div>
          <iframe
            width="560"
            height="315"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${
              recipe.strYoutube.split('v=')[1]
            }` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
          clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) }
      <div data-testid="0-recomendation-card" />
    </div>
  );
}
