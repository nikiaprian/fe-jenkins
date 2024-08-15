import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

test('renders Navbar component', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Add your assertions here
  expect(screen.getByText(/Daftar/i)).toBeInTheDocument();
});
