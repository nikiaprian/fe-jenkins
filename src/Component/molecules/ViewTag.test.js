import { render, screen } from '@testing-library/react';
import ViewTag from './ViewTag';

test('renders ViewTag component with provided tags', () => {
  const tags = [
    { id: '1', tag: 'HTML' },
    { id: '2', tag: 'React' },
    { id: '3', tag: 'CSS' }
  ];

  render(<ViewTag tags={tags} />);

  // Verify that all tags are rendered correctly
  tags.forEach((tag) => {
    expect(screen.getByText(`#${tag.tag}`)).toBeInTheDocument();
  });
});

test('renders nothing if no tags are provided', () => {
  render(<ViewTag tags={[]} />);

  // Verify that no tags are rendered
  const tags = screen.queryAllByRole('listitem');
  expect(tags).toHaveLength(0);
});
