import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

test('renders Footer component with expected links', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  
  // Contoh assertions
  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('Help Center')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
  
  // Memastikan link tertentu ada dengan href yang benar
  expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/username');
  expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', 'https://linkedin.com/in/username');

  // Memastikan ada ikon media sosial tertentu
  expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
  expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
});
