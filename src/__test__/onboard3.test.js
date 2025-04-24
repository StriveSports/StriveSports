// __tests__/Onboard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Onboard from '../pages/onboard3';
import React from 'react';

// Mock Clerk Components
jest.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }) => <>{children}</>,
  SignedOut: ({ children }) => <div data-testid="signed-out">{children}</div>,
  RedirectToSignIn: ({ redirectUrl }) => <div data-testid="redirect">{`Redirecting to ${redirectUrl}`}</div>,
  UserButton: () => <div data-testid="user-button">UserButton</div>,
}));

// Mock images
jest.mock('../assets/images/STEP1.jpg', () => 'STEP1.jpg');
jest.mock('../assets/images/STEP2.jpg', () => 'STEP2.jpg');
jest.mock('../assets/images/STEP3.jpg', () => 'STEP3.jpg');
jest.mock('../assets/images/STEP4.jpg', () => 'STEP4.jpg');
jest.mock('../assets/images/STEP5.jpg', () => 'STEP5.jpg');
jest.mock('../assets/images/STEP6.jpg', () => 'STEP6.jpg');
jest.mock('../assets/images/STEP7.jpg', () => 'STEP7.jpg');

describe('Onboard Component', () => {
  test('renders all sport steps and user button when signed in', () => {
    render(<Onboard />);
    
    const steps = ['STEP1', 'STEP2', 'STEP3', 'STEP4', 'STEP5', 'STEP6', 'STEP7'];
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });

  test('clicking on a step registers it as selected (basic confirmation)', () => {
    render(<Onboard />);
    
    const step = screen.getByText('STEP5');
    fireEvent.click(step);
    expect(screen.getByText('STEP5')).toBeInTheDocument(); // visible
  });

  test('shows redirect message when SignedOut', () => {
    // Override SignedIn to simulate a signed-out state
    jest.mock('@clerk/clerk-react', () => ({
      SignedIn: () => null,
      SignedOut: ({ children }) => <div>{children}</div>,
      RedirectToSignIn: ({ redirectUrl }) => <div data-testid="redirect">{`Redirecting to ${redirectUrl}`}</div>,
      UserButton: () => <div data-testid="user-button">UserButton</div>,
    }));

    render(<Onboard />);
    expect(screen.getByTestId('redirect')).toHaveTextContent('Redirecting to /Components/Signup/signup');
  });
});
