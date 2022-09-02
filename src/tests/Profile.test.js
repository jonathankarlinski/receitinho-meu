import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa do componente Profile', () => {
  test('Testa se existe os links de perfil', () => {
    renderWithRouter(<Profile />);
    
    const profile = screen.getByTestId('profile-top-btn')
  
    expect(profile).toBeInTheDocument();
    userEvent.click(profile)
  });

  test('Testa se existe os links de perfil', () => {
    renderWithRouter(<Profile />);
    
    const doneButton = screen.getByTestId('profile-done-btn')
  
    expect(doneButton).toBeInTheDocument();
    userEvent.click(doneButton)
  });

  test('Testa se existe os links de perfil', () => {
    renderWithRouter(<Profile />);
    
    const profileButton = screen.getByTestId('profile-favorite-btn')
  
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton)
  });
  
  test('Testa se existe os links de perfil', () => {
    renderWithRouter(<Profile />);
    
    const logoutButton = screen.getByTestId('profile-logout-btn')
  
    expect(logoutButton).toBeInTheDocument();
    userEvent.click(logoutButton)
  });
});