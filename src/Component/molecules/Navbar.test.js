import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders all navigation links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Assert that all links are present
  const links = ['ForumIn', 'BlogIn', 'Tentang', 'FaQ'];
  links.forEach((linkText) => {
    expect(screen.getByText(linkText)).toBeInTheDocument();
  });
});
