import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

test('renders Navbar component', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  // Add your assertions here
});
