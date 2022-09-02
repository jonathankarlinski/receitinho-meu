import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import { SearchProvider } from '../context/search';
import App from '../App';
jest.mock('clipboard-copy');

describe('Testa do componente DoneRecipes', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<DoneRecipes />);
    
    const text = screen.getByText('Done Recipes')
  
    expect(text).toBeInTheDocument();
  });
  test('Testa se existe o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<SearchProvider>
       <App />
    </SearchProvider>
    );

    localStorage.setItem('doneRecipes', JSON.stringify(
        [
         {
           id: "52977",
           nationality: "Italian",
           category: "Vegetarian",
           doneDate: "09/01/2022",
           image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
           name: "Corba",
           tags: ["Pasta","Curry"],
           type: "food",
        },
        {
          id: "11007",
          alcoholicOrNot: "Alcoholic",
          category: "Ordinary Drink",
          doneDate: "10/01/2022",
          image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
          name: "Margarita",
          tags: ["IBA","ContemporaryClassic"],
          type: "drink",
       },
      ]
    ))

    history.push("/done-recipes");

    const test = await screen.findByTestId('0-horizontal-name');
    expect(test).toHaveTextContent('Corba');
  
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFoods = screen.getByTestId('filter-by-food-btn');
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');
    const btnShare = await screen.getByTestId('0-horizontal-share-btn');

    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);
    userEvent.click(filterAll);
    userEvent.click(filterFoods);
    userEvent.click(filterDrinks);

  });
});
