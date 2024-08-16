import { render, screen, fireEvent } from '@testing-library/react';
import BackSubmit from './BackSubmit';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockHandleClick = jest.fn();

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  jest.clearAllMocks();
});

test('renders BackSubmit component with buttons', () => {
  render(
    <MemoryRouter>
      <BackSubmit handleClick={mockHandleClick} />
    </MemoryRouter>
  );

  // Verify that both buttons are in the document
  expect(screen.getByText('Kembali')).toBeInTheDocument();
  expect(screen.getByText('Kirim')).toBeInTheDocument();
});

test('navigates back when "Kembali" button is clicked', () => {
  render(
    <MemoryRouter>
      <BackSubmit handleClick={mockHandleClick} />
    </MemoryRouter>
  );

  // Simulate click on "Kembali" button
  fireEvent.click(screen.getByText('Kembali'));

  // Verify that navigate(-1) was called
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});

test('calls handleClick function when "Kirim" button is clicked', () => {
  render(
    <MemoryRouter>
      <BackSubmit handleClick={mockHandleClick} />
    </MemoryRouter>
  );

  // Simulate click on "Kirim" button
  fireEvent.click(screen.getByText('Kirim'));

  // Verify that handleClick was called
  expect(mockHandleClick).toHaveBeenCalled();
});
