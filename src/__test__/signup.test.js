import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../Components/Signup/signup';

const mockRedirect = jest.fn();

jest.mock('@clerk/clerk-react', () => ({
  SignInButton: ({ redirectUrl, children }) => (
    <button onClick={() => mockRedirect(redirectUrl)}>{children}</button>
  )
}));

describe('SignUp Component - Redirection', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('redirects user to WelcomeScreen on Sign In button click', () => {
    render(<SignUp />);
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    expect(mockRedirect).toHaveBeenCalledWith('/pages/WelcomeScreen');
  });
});
