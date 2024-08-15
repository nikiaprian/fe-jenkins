import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component with logo and navigation links', () => {
  render(<Navbar />);
  
  const logoElement = screen.getByAltText(/logo/i); // Assuming there's an alt text for logo
  const homeLink = screen.getByText(/Home/i);
  const aboutLink = screen.getByText(/About/i);
  
  expect(logoElement).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
});
