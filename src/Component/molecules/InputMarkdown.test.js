import React from 'react';
import { render } from '@testing-library/react';
import InputMarkdown from './InputMarkdown';

test('renders InputMarkdown component without crashing', () => {
  render(<InputMarkdown />);
});
