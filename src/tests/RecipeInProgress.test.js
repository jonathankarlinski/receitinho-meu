import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
import App from '../App';
import { SearchProvider } from '../context/search';
jest.mock('clipboard-copy');

describe('Testa do componente RecipeInProgress', () => {
  test('Testa se existe o botão de compartilhar', async () => {
    renderWithRouter(<RecipeInProgress />);
    
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();

    const btnShare = screen.getByText('Share');
    userEvent.click(btnShare);
  });

  test('Testa os checks da receita', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    )
    // localStorage.setItem('doneRecipes', JSON.stringify(
    //   [
    //    {
    //      id: "52977",
    //      nationality: "Italian",
    //      category: "Vegetarian",
    //      doneDate: "09/01/2022",
    //      image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    //      name: "Corba",
    //      tags: ["Pasta","Curry"],
    //      type: "food",
    //   },
    // ]
    // ))

    // history.push("/done-recipes");

    // const item1 = await screen.findByTestId('0-horizontal-top-text');
    // const item2 = await screen.findByTestId('0-horizontal-name');
    // const item3 = await screen.findByTestId('0-Pasta-horizontal-tag');
    // const item4 = await screen.findByTestId('0-Curry-horizontal-tag');
    // expect(item1).toBeInTheDocument();
    // expect(item2).toBeInTheDocument();
    // expect(item3).toBeInTheDocument();
    // expect(item4).toBeInTheDocument();
  });
  test('Testa os checks da receita', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    )
    localStorage.removeItem('doneRecipes');
    history.push("/done-recipes");

    const item1 = screen.queryByTestId('0-horizontal-top-text');

    expect(item1).toBeNull();

  });
  test('Testa o clique do botão', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    )

    history.push("/foods/52977/in-progress");

    const item1 = await screen.findByText('Lentils');
    const item2 = await screen.findByText('Onion');
    const item3 = await screen.findByText('Carrots');
    const item4 = await screen.findByText('Tomato Puree');
    const item5 = await screen.findByText('Cumin');
    const item6 = await screen.findByText('Paprika');
    const item7 = await screen.findByText('Mint');
    const item8 = await screen.findByText('Thyme');
    const item9 = await screen.findByText('Black Pepper');
    const item10 = await screen.findByText('Red Pepper Flakes');
    const item11 = await screen.findByText('Vegetable Stock');
    const item12 = await screen.findByText('Water');
    const item13 = await screen.findByText('Sea Salt');

    userEvent.click(item1)
    userEvent.click(item2)
    userEvent.click(item3)
    userEvent.click(item4)
    userEvent.click(item5)
    userEvent.click(item6)
    userEvent.click(item7)
    userEvent.click(item8)
    userEvent.click(item9)
    userEvent.click(item10)
    userEvent.click(item11)
    userEvent.click(item12)
    userEvent.click(item13)

    await waitFor(() => {
      expect(screen.getByTestId('finish-recipe-btn')).toBeEnabled()
    })

    const finishButton = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishButton)
  });
  test('Testa o clique do botão drinks', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>
    )

    history.push("/drinks/15997/in-progress");

    const item1 = await screen.findByText('Galliano');
    const item2 = await screen.findByText('Ginger ale');
    const item3 = await screen.findByText('Ice');

    userEvent.click(item1)
    userEvent.click(item2)
    userEvent.click(item3)

    await waitFor(() => {
      expect(screen.getByTestId('finish-recipe-btn')).toBeEnabled()
    })

    const finishButton = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishButton)
  });
});
