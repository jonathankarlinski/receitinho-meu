import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../utils/renderWithRouter';
import Footer from '../components/Footer';

describe('Testa do componente Footer', () => {
  test('Testa se existe o texto footer', () => {
    renderWithRouter(<Footer />);
    
    const text = screen.getByText('Footer')
  
    expect(text).toBeInTheDocument();
  });
});
