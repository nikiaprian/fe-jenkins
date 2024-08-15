import React from 'react';
import { render } from '@testing-library/react';
import ScrollButton from './ScrollButton';

test('renders ScrollButton component', () => {
  render(<ScrollButton />);
  const scrollButtonElement = document.querySelector('button');
  expect(scrollButtonElement).toBeInTheDocument();
});
