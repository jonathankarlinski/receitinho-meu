import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Testa do componente RecipeInProgress', () => {
  test('Testa se existe o componente', () => {
    renderWithRouter(<RecipeInProgress />);
    
    const text = screen.getByText('Recipe In Progress')
  
    expect(text).toBeInTheDocument();
  });
});
