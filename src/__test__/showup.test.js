import { render, screen } from '@testing-library/react';
import ShowUp from '../showup';
import '@testing-library/jest-dom';

describe('ShowUp Component', () => {
  it('renders correctly and displays the correct content', () => {
    render(<ShowUp />);

    // Check if the h1 text is displayed correctly
    const headingElement = screen.getByText(/StriveSports/i);
    expect(headingElement).toBeInTheDocument();  // Assert that it's in the document
    expect(headingElement).toHaveClass('showupclass');
  });
});
