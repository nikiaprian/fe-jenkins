import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './Component/pages/HomePage';

test('renders homepage elements', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  const element = screen.getByText(/Website untuk membantu/);
  expect(element).toBeInTheDocument();
});
