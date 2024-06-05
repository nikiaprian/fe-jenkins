import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders homepage elements', async () => {
  await act(async () => {
    const { container, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Print the entire container for debugging
    debug(container);

    // Check if the text "Website untuk membantu" is in the document
    await waitFor(() => {
      const element = screen.getByText(/Website untuk membantu/);
      debug(element);  // Add this line
      expect(element).toBeInTheDocument();
    });
  });
});




// import React from 'react';
// import { render } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// import App from './App';

// test('renders learn react link', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   // Your test assertions here
// });
