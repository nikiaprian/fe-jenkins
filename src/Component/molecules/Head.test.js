import { render, screen, fireEvent } from '@testing-library/react';
import Head from './Head';
import { MemoryRouter } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

// Mock useAuthStore
jest.mock('../store/AuthStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Setup mock values
const mockSetFilter = jest.fn();
const mockIsLoggedIn = true; // Change to false to test for not logged in

beforeEach(() => {
  useAuthStore.mockReturnValue({ isLoggedIn: mockIsLoggedIn });
  window.localStorage.setItem('ACCESS_KEY', 'mockAccessKey'); // Mock localStorage
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders Head component with title and content', () => {
  render(
    <MemoryRouter>
      <Head titleHead="Test Title" contentHead="Test Content" setFilter={mockSetFilter} path="/test" nameButton="Edit" />
    </MemoryRouter>
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});

test('navigates to correct link based on login status', () => {
  render(
    <MemoryRouter>
      <Head titleHead="Test Title" contentHead="Test Content" setFilter={mockSetFilter} path="/test" nameButton="Edit" />
    </MemoryRouter>
  );

  // Verify the link's href
  expect(screen.getByText('Edit').closest('a')).toHaveAttribute('href', '/test');
});

test('calls setFilter with input value on button click', () => {
  render(
    <MemoryRouter>
      <Head titleHead="Test Title" contentHead="Test Content" setFilter={mockSetFilter} path="/test" nameButton="Edit" />
    </MemoryRouter>
  );

  // Simulate input change and button click
  fireEvent.change(screen.getByPlaceholderText('Cari berdasarkan Tag'), { target: { value: 'tagValue' } });
  fireEvent.click(screen.getByText('Telusuri'));

  // Verify setFilter has been called with the correct value
  expect(mockSetFilter).toHaveBeenCalledWith('tagValue');
});

test('button redirects to login if not logged in', () => {
  useAuthStore.mockReturnValue({ isLoggedIn: false });
  render(
    <MemoryRouter>
      <Head titleHead="Test Title" contentHead="Test Content" setFilter={mockSetFilter} path="/test" nameButton="Edit" />
    </MemoryRouter>
  );

  // Verify the link's href when not logged in
  expect(screen.getByText('Edit').closest('a')).toHaveAttribute('href', '/login?redirect=/test');
});
