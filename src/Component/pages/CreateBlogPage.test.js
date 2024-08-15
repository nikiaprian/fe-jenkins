import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateBlogPage from './CreateBlogPage';

test('renders CreateBlogPage with title input and submit button', () => {
  render(<CreateBlogPage />);
  
  const titleInput = screen.getByPlaceholderText(/Enter title/i);
  const submitButton = screen.getByText(/Submit/i);
  
  expect(titleInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
