// src/Component/molecules/PreviewMarkdown.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // untuk matchers seperti toBeInTheDocument
import PreviewMarkdown from './PreviewMarkdown';

describe('PreviewMarkdown Component', () => {
  test('renders content from editorState prop', () => {
    const htmlContent = '<p>This is a <strong>test</strong> content.</p>';
    
    // Render the component with the HTML content as a prop
    render(<PreviewMarkdown editorState={htmlContent} />);
    
    // Verify that the content is rendered correctly
    const renderedContent = screen.getByText('This is a test content.');
    expect(renderedContent).toBeInTheDocument();
    
    const strongText = screen.getByText('test');
    expect(strongText).toHaveClass('font-bold');
  });

  test('renders without crashing when editorState is empty', () => {
    // Render the component with an empty prop
    render(<PreviewMarkdown editorState="" />);
    
    // Verify that the container is rendered
    const previewContainer = screen.getByText('Preview');
    expect(previewContainer).toBeInTheDocument();
    
    // Ensure no content is rendered
    const noContent = screen.queryByText('Preview');
    expect(noContent).toBeInTheDocument();
  });
});
