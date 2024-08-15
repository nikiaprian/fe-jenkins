import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

test('renders Footer component with expected links', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  
  // Memastikan elemen dengan teks yang benar ada
  expect(screen.getByText('Fitur')).toBeInTheDocument();
  expect(screen.getByText('Pusat Bantuan')).toBeInTheDocument();
  expect(screen.getByText('Info Kontak')).toBeInTheDocument();
  
  // Memastikan link tertentu ada dengan href yang benar
  expect(screen.getByRole('link', { name: /Forum CodeIn/i })).toHaveAttribute('href', '/forum');
  expect(screen.getByRole('link', { name: /Blog CodeIn/i })).toHaveAttribute('href', '/blog');

  // Memastikan ada ikon media sosial tertentu
  expect(screen.getByAltText('facebook')).toBeInTheDocument();
});
