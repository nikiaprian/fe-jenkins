import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import Navbar from './Navbar';

jest.mock('../store/AuthStore', () => ({
  __esModule: true,
  default: () => ({
    isLoggedIn: true,
    setIsLoggedIn: jest.fn(),
    setUser: jest.fn(),
  }),
}));

test('shows profile and logout button when logged in', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Assert profile picture and logout button are present
  expect(screen.getByRole('button', { name: /Keluar/i })).toBeInTheDocument();
  expect(screen.getByAltText('')).toBeInTheDocument(); // Check profile image
});

jest.mock('../store/AuthStore', () => ({
  __esModule: true,
  default: () => ({
    isLoggedIn: false,
    setIsLoggedIn: jest.fn(),
    setUser: jest.fn(),
  }),
}));

test('shows login and register links when not logged in', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Assert login and register links are present
  expect(screen.getByRole('button', { name: /Masuk/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Daftar/i })).toBeInTheDocument();
});
