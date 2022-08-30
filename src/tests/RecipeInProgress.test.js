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
    
    history.push("/foods/52977/in-progress");
    expect(history.location.pathname).toBe("/foods/52977/in-progress");

    const title = await screen.findByText('Corba');
    expect(title).toBeInTheDocument();

    const ingredient1 = await screen.findByText('Lentils');
    const ingredient2 = await screen.findByText('Onion');
    const ingredient3 = await screen.findByText('Mint');

    expect(ingredient1).toBeInTheDocument();
    userEvent.click(ingredient1);

    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient2);

    expect(ingredient3).toBeInTheDocument();
    userEvent.click(ingredient3);
  });
});
