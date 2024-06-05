import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders homepage elements', async () => {
  const { container, debug } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Print the rendered container for debugging
  debug(container);

  // Check if the text "Website untuk membantu" is in the document
  await waitFor(() => {
    const element = screen.getByText(/Website untuk membantu/);
    debug(element);  // Add this line
    expect(element).toBeInTheDocument();
  });
});
