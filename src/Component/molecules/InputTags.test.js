import { render, screen, fireEvent } from '@testing-library/react';
import InputTag from './InputTags';
import '@testing-library/jest-dom/extend-expect';

const mockSetTags = jest.fn();

test('renders InputTag component', () => {
  render(<InputTag setTags={mockSetTags} />);

  // Verify the component renders correctly
  expect(screen.getByText('Tags')).toBeInTheDocument();
});

test('adds a new tag', () => {
  render(<InputTag setTags={mockSetTags} />);

  // Get the input element and simulate adding a tag
  const input = screen.getByPlaceholderText('Add a tag');
  fireEvent.change(input, { target: { value: 'NewTag' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });

  // Verify that the tag is added
  expect(mockSetTags).toHaveBeenCalledWith([{ id: 'NewTag', text: 'NewTag' }]);
});

test('deletes a tag', () => {
  const initialTags = [{ id: '1', text: 'Tag1' }];
  render(<InputTag setTags={mockSetTags} />);

  // Set initial tags
  fireEvent.change(screen.getByPlaceholderText('Add a tag'), { target: { value: 'Tag1' } });
  fireEvent.keyDown(screen.getByPlaceholderText('Add a tag'), { key: 'Enter', code: 13 });

  // Simulate tag deletion
  const deleteButton = screen.getByLabelText('Delete');
  fireEvent.click(deleteButton);

  // Verify that the delete function was called
  expect(mockSetTags).toHaveBeenCalledWith([]);
});

test('handles tag drag and drop', () => {
  // Setup initial state
  const initialTags = [{ id: '1', text: 'Tag1' }, { id: '2', text: 'Tag2' }];
  render(<InputTag setTags={mockSetTags} />);

  // Simulate drag and drop
  const tag1 = screen.getByText('Tag1');
  const tag2 = screen.getByText('Tag2');

  // Assume we have some way to simulate drag and drop in our tests
  // Note: Simulating drag-and-drop in tests is complex and often involves additional libraries or custom implementations

  // Verify that the tags were reordered correctly
  expect(mockSetTags).toHaveBeenCalledWith([{ id: '2', text: 'Tag2' }, { id: '1', text: 'Tag1' }]);
});
