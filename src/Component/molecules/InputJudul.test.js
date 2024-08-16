import { render, screen, fireEvent } from '@testing-library/react';
import InputJudul from './InputJudul';

test('renders InputJudul component with correct label and placeholder', () => {
  // Mock function for setInputJudul
  const setInputJudul = jest.fn();

  // Render the InputJudul component
  render(<InputJudul label="Judul Blog" placeholder="Masukkan judul" setInputJudul={setInputJudul} />);

  // Check if the label is rendered correctly
  expect(screen.getByLabelText(/Judul Blog/i)).toBeInTheDocument();

  // Check if the input field has the correct placeholder
  expect(screen.getByPlaceholderText(/Masukkan judul/i)).toBeInTheDocument();
});

test('calls setInputJudul with correct value when input changes', () => {
  // Mock function for setInputJudul
  const setInputJudul = jest.fn();

  // Render the InputJudul component
  render(<InputJudul label="Judul Blog" placeholder="Masukkan judul" setInputJudul={setInputJudul} />);

  // Get the input element
  const inputElement = screen.getByPlaceholderText(/Masukkan judul/i);

  // Simulate a change event
  fireEvent.change(inputElement, { target: { value: 'New Title' } });

  // Check if setInputJudul has been called with the correct value
  expect(setInputJudul).toHaveBeenCalledWith('New Title');
});
