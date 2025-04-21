import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AfterSignInRedirect from '../afterSignInRedirect';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import getUserById from '../adminResources/getUserById';

// Mocks
jest.mock('@clerk/clerk-react', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../adminResources/getUserById');

describe('AfterSignInRedirect', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/' }); // ensure location.pathname === '/' for the effect to trigger
  });

  it('redirects resident to /pages/resident', async () => {
    useAuth.mockReturnValue({ userId: 'resident123' });

    getUserById.mockResolvedValue({
      publicMetadata: {
        role: 'resident',
      },
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pages/resident');
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

  it('redirects removed user to /adminResources/BlockedUser', async () => {
    useAuth.mockReturnValue({ userId: 'removed123' });

    getUserById.mockResolvedValue({
      publicMetadata: {
        role: 'removed',
      },
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/adminResources/BlockedUser');
    });
  });

  it('redirects to WelcomeScreen when role is none or missing', async () => {
    useAuth.mockReturnValue({ userId: 'none123' });

    getUserById.mockResolvedValue({
      publicMetadata: {
        role: 'none',
      },
    });

    render(<AfterSignInRedirect />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pages/WelcomeScreen');
    });
  });

  it('redirects to WelcomeScreen when role is undefined', async () => {
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
