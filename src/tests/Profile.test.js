import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa do componente Profile', () => {
  test('Testa se existe os links de perfil', () => {
    renderWithRouter(<Profile />);
    
    const profile = screen.getByTestId('profile-top-btn')
  
    expect(profile).toBeInTheDocument();
  });
});
