import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store'; // ganti dengan path rootReducer yang sesuai
import { jest } from '@jest/globals';

// Mock Store
const store = createStore(rootReducer);

// Mocking useAuthStore Hook
jest.mock('../store/AuthStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoggedIn: true,
    setIsLoggedIn: jest.fn(),
    setUser: jest.fn(),
  })),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  });

  it('should render logo', () => {
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    const forumLink = screen.getByText('ForumIn');
    const blogLink = screen.getByText('BlogIn');
    const tentangLink = screen.getByText('Tentang');
    const faqLink = screen.getByText('FaQ');
    expect(forumLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(tentangLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
  });

  it('should render user profile picture and logout button when logged in', () => {
    const profileImage = screen.getByAltText('');
    expect(profileImage).toBeInTheDocument();
    const logoutButton = screen.getByText('Keluar');
    expect(logoutButton).toBeInTheDocument();
  });

  it('should call handleLogout on logout button click', () => {
    const logoutButton = screen.getByText('Keluar');
    fireEvent.click(logoutButton);
    // You would need to check if the appropriate logout functions are called
  });

  it('should toggle menu visibility on mobile', () => {
    const toggleButton = screen.getByRole('button', { name: /menu/i });
    expect(toggleButton).toBeInTheDocument();
    fireEvent.click(toggleButton);
    const menu = screen.getByRole('navigation');
    expect(menu).toHaveClass('top-20');
  });

  // You can add more tests for different scenarios and edge cases
});
