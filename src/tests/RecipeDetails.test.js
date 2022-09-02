import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { SearchProvider } from '../context/search';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from '../utils/renderWithRouter';
jest.mock('clipboard-copy');

describe('Testa do componente RecipeDetails', () => {
  test('Testa se existe os componentes de texto', () => {
    renderWithRouter(<RecipeDetails />);
    const text = screen.getByText('Recommendations');
    const instructions = screen.getByText('Instructions');
    const ingredients = screen.getByText('Ingredients');
    const share = screen.getByText('Share');
    const favBtn = screen.getByTestId('favorite-btn');
    const startRecipe = screen.getByTestId('start-recipe-btn');

    userEvent.click(favBtn);
    userEvent.click(favBtn);
    userEvent.click(share);

    expect(favBtn).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(share).toBeInTheDocument();
    expect(startRecipe).toBeInTheDocument();
    userEvent.click(startRecipe);
  });

  test('Testa comportamento de filtro por categoria na página Foods', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    );

    window.document.execCommand = () => {}
    
    history.push("/foods/52977");
    expect(history.location.pathname).toBe("/foods/52977");

    await waitFor(() => {
      expect(screen.getByText('Lentils')).toBeInTheDocument()
    }, {timeout: 3000})

    const startRec = screen.getByTestId('start-recipe-btn');
    expect(startRec).toHaveTextContent('Start Recipe');
  });

  test('Testa comportamento de filtro por categoria na página Foods', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        meals: {
          "52977": ""
        },
        drinks: {
          "17203": ""
        }
      }
    ))

    history.push("/foods/52977");
    expect(history.location.pathname).toBe("/foods/52977");

    await waitFor(() => {
      expect(screen.getByText('Lentils')).toBeInTheDocument()
    }, {timeout: 3000})

    const startRec = screen.getByTestId('start-recipe-btn');

    expect(startRec).toHaveTextContent('Continue Recipe');
  });

  test('', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52977',
        type: '',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
      }
    ]))

    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    );

    history.push("/foods/52977");
    expect(history.location.pathname).toBe("/foods/52977");

    const favoriteIcon = screen.getByTestId("favorite-btn")

    await waitFor(() => {
      expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg')
    })
  })

  // test('', async () => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([
  //     {
  //       id: '17203',
  //       type: '',
  //       nationality: '',
  //       category: '',
  //       alcoholicOrNot: '',
  //       name: '',
  //       image: '',
  //     }
  //   ]))
    
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(
  //     {
  //       meals: {
  //         "52977": ""
  //       },
  //       drinks: {
  //         "17203": ""
  //       }
  //     }
  //   ))

  //   const { history } = renderWithRouter(
  //     <SearchProvider>
  //       <App />
  //     </SearchProvider>
  //   );

  //   history.push("/drinks/17203");
  //   expect(history.location.pathname).toBe("/drinks/17203");

  //   const favoriteIcon = screen.getByTestId("favorite-btn")

  //   await waitFor(() => {
  //     expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg')
  //   })
  // })
});
