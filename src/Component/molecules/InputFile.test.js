import { render, screen, fireEvent } from '@testing-library/react';
import InputFile from './InputFile';
import '@testing-library/jest-dom';

test('renders InputFile component', () => {
  render(<InputFile type="createBlog" input={() => {}} />);

  // Check if the label for the file input is rendered
  expect(screen.getByText('Upload Image Banner Blog')).toBeInTheDocument();

  // Check if the drag and drop area is rendered
  expect(screen.getByText('Click to upload')).toBeInTheDocument();
});

test('calls input function when file is selected', () => {
  const mockInputFunction = jest.fn();
  render(<InputFile type="createBlog" input={mockInputFunction} />);

  const fileInput = screen.getByLabelText(/Click to upload/i);

  // Create a mock file
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

  // Simulate file selection
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Check if the input function was called with the file
  expect(mockInputFunction).toHaveBeenCalledWith(file);
});

// versi simpelnya
// import React from 'react';
// import { render } from '@testing-library/react';
// import InputFile from './InputFile';

// test('renders InputFile component', () => {
//   render(<InputFile />);
//   const inputElement = document.querySelector('input[type="file"]');
//   expect(inputElement).toBeInTheDocument();
// });
