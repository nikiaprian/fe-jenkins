import React from 'react';
import { render } from '@testing-library/react';
import InputFile from './InputFile';

test('renders InputFile component', () => {
  render(<InputFile />);
  const inputElement = document.querySelector('input[type="file"]');
  expect(inputElement).toBeInTheDocument();
});
