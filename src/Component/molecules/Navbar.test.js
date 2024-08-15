import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

jest.mock('../store/AuthStore');

test('renders Navbar component', () => {
  // Mock isLoggedIn state from the auth store
  useAuthStore.mockReturnValue({
    isLoggedIn: false,
    setIsLoggedIn: jest.fn(),
    setUser: jest.fn(),
  });

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Assert the presence of "Daftar" and "Masuk" buttons when not logged in
  expect(screen.getByText(/Daftar/i)).toBeInTheDocument();
  expect(screen.getByText(/Masuk/i)).toBeInTheDocument();

  // Assert the presence of links in the navbar
  expect(screen.getByText(/ForumIn/i)).toBeInTheDocument();
  expect(screen.getByText(/BlogIn/i)).toBeInTheDocument();
  expect(screen.getByText(/Tentang/i)).toBeInTheDocument();
  expect(screen.getByText(/FaQ/i)).toBeInTheDocument();
});

test('renders Navbar component when logged in', () => {
  // Mock isLoggedIn state from the auth store to be true
  useAuthStore.mockReturnValue({
    isLoggedIn: true,
    setIsLoggedIn: jest.fn(),
    setUser: jest.fn(),
  });

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Assert the presence of "Keluar" button when logged in
  
  // Assert that "Daftar" and "Masuk" buttons are not rendered
  expect(screen.queryByText(/Daftar/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Masuk/i)).not.toBeInTheDocument();
});
