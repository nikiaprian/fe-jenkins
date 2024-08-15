import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ScrollButton from './ScrollButton';

test('renders ScrollButton component after scrolling', () => {
  render(<ScrollButton />);

  // Simulate scroll event and set scrollTop manually
  Object.defineProperty(document.documentElement, 'scrollTop', {
    value: 400,
    writable: true,
  });
  
  fireEvent.scroll(window);

  // Now, try to find the button's container (div)
  const scrollButtonContainer = document.querySelector('div[style*="inline"]');
  expect(scrollButtonContainer).toBeInTheDocument();
});
