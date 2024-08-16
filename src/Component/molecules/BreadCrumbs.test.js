import { render, screen, fireEvent } from '@testing-library/react';
import BreadCrumbs from './BreadCrumbs';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  jest.clearAllMocks();
});

test('renders BreadCrumbs component with props', () => {
  render(<BreadCrumbs prev="Previous Page" current="Current Page" />);

  // Verify that both breadcrumb items are in the document
  expect(screen.getByText('Previous Page')).toBeInTheDocument();
  expect(screen.getByText('Current Page')).toBeInTheDocument();
});

test('navigates back when "prev" breadcrumb is clicked', () => {
  render(<BreadCrumbs prev="Previous Page" current="Current Page" />);

  // Simulate click on "prev" breadcrumb
  fireEvent.click(screen.getByText('Previous Page'));

  // Verify that navigate(-1) was called
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
