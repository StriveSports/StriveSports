// ShowUp.test.js
import { render, screen } from '@testing-library/react';
import ShowUp from '../showup';  // Make sure the path is correct based on your project structure
import '@testing-library/jest-dom';

describe('ShowUp Component', () => {
  it('renders correctly and displays the correct content', () => {
    // Render the component
    render(<ShowUp />);

    // Check if the h1 text is displayed correctly
    const headingElement = screen.getByText(/StriveSports/i);
    expect(headingElement).toBeInTheDocument();  // Assert that it's in the document

    // Check if the class name is applied correctly
    expect(headingElement).toHaveClass('showupclass');
  });
});
