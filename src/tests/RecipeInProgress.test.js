import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
jest.mock('clipboard-copy');

describe('Testa do componente RecipeInProgress', () => {
  test('Testa se existe o botão de compartilhar', () => {
    renderWithRouter(<RecipeInProgress />);
    
    const btnShare = screen.getByText('Share');

    userEvent.click(btnShare);
  
    expect(btnShare).toBeInTheDocument();
  });
  test('Testa os checks da receita', async () => {
    const { history } = renderWithRouter(<RecipeInProgress />);
    
    history.push("/foods/52977/in-progress");
    expect(history.location.pathname).toBe("/foods/52977/in-progress");

    await waitFor(() => {
      expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument()
    }, {timeout: 3000})

    // const btnShare = screen.getByText('Shar');

    // userEvent.click(btnShare);
  
    // expect(btnShare).toBeInTheDocument();
  });
});
