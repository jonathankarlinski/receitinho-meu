import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
  
  test('Testa o comportamento de habilitar e desabilitar o botão', () => {
    renderWithRouter(<App />);

    const email = screen.getByLabelText(/email/i)
    const password = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button', {name: /enter/i})

    expect(button).toBeDisabled()
    
    userEvent.type(email, "marcelinho")
    userEvent.type(password, "12345")

    expect(button).toBeDisabled()

    userEvent.type(email, "marcelinho@teste.com")
    userEvent.type(password, "12345678")

    expect(button).toBeEnabled();
  })

  test('Testa o comportamento do botão', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByLabelText(/email/i)
    const password = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button', {name: /enter/i})

    userEvent.type(email, "marcelinho@teste.com")
    userEvent.type(password, "12345678")

    userEvent.click(button)

    expect(history.location.pathname).toBe("/foods")
  })
})
