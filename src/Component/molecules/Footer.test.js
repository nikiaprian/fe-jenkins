import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer component with expected links', () => {
  render(<Footer />);
  
  const contactLink = screen.getByText(/Contact Us/i);
  const privacyLink = screen.getByText(/Privacy Policy/i);
  
  expect(contactLink).toBeInTheDocument();
  expect(privacyLink).toBeInTheDocument();
});
