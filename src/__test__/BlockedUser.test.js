import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockedUser from '../adminResources/BlockedUser';
import '@testing-library/jest-dom';

// Mock the UserButton component from Clerk
jest.mock('@clerk/clerk-react', () => ({
  UserButton: jest.fn(() => <div data-testid="user-button">Mock UserButton</div>)
}));

describe('BlockedUser Component', () => {
  test('renders denial message and user button', () => {
    render(<BlockedUser />);
    
    // Check the main heading text
    const heading = screen.getByText(/Access to this website has been denied/i);
    expect(heading).toBeInTheDocument();

    // Check that the mocked UserButton is rendered
    const userButton = screen.getByTestId('user-button');
    expect(userButton).toBeInTheDocument();
  });
});
