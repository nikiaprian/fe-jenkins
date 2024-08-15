import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ScrollButton from './ScrollButton';

test('renders ScrollButton component after scrolling', () => {
  render(<ScrollButton />);

  // Simulate scroll event
  fireEvent.scroll(window, { target: { scrollY: 400 } });

  // Now, try to find the button
  const scrollButtonElement = document.querySelector('button');
  expect(scrollButtonElement).toBeInTheDocument();
});
