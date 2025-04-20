import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AfterSignInRedirect from '../afterSignInRedirect';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import getUserById from '../adminResources/getUserById';

// Mocks
jest.mock('@clerk/clerk-react', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../adminResources/getUserById');

describe('AfterSignInRedirect', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('redirects resident to /pages/WelcomeScreen', async () => {
    useAuth.mockReturnValue({ userId: 'resident123' });

    getUserById.mockResolvedValue({
      publicMetadata: {
        role: 'resident',
      },
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pages/WelcomeScreen');
    });
  });

  it('redirects admin to /adminResources/adminDashboard', async () => {
    useAuth.mockReturnValue({ userId: 'admin123' });

    getUserById.mockResolvedValue({
      publicMetadata: {
        role: 'admin',
      },
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/adminResources/adminDashboard');
    });
  });

  it('redirects to WelcomeScreen when role is missing', async () => {
    useAuth.mockReturnValue({ userId: 'unknown123' });

    getUserById.mockResolvedValue({
      publicMetadata: {},
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pages/WelcomeScreen');
    });
  });
});
