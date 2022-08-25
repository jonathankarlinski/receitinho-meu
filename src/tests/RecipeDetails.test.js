import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testa do componente RecipeDetails', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<RecipeDetails />);

    const text = screen.getByText('Recomendações')

    waitFor(() => {
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument()
    })

    expect(text).toBeInTheDocument();
  });
});
