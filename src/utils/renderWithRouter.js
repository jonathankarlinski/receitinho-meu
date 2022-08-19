import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();
  const renderObject = (
    render(<Router history={ customHistory }>{ componentToRender }</Router>)
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}
