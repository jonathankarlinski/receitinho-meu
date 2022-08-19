import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa a tela de login', () => {
  test('Testa os inputs de email e password', () => {
    renderWithRouter(<App />);
    
    const email = screen.getByLabelText(/email/i)
    const password = screen.getByLabelText(/password/i)
  
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
  
  test('Testa se o botão está na tela', () => {
    renderWithRouter(<App />);
    
    const button = screen.getByRole('button', {name: /enter/i})
  
    expect(button).toBeInTheDocument();
  });
})
