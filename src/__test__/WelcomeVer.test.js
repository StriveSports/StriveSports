import { render, screen, fireEvent } from '@testing-library/react';
import ShowUp from '../pages/WelcomeScreen';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }) => <>{children}</>,
  SignedOut: () => null,
  RedirectToSignIn: () => null,
  UserButton: () => <div>UserButton</div>,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

test('renders the welcome heading', () => {
  render(<ShowUp />);
  expect(screen.getByRole('heading', { name: /welcome to the strivesports community/i })).toBeInTheDocument();
});

test('renders the welcome paragraph', () => {
  render(<ShowUp />);
  expect(
    screen.getByText(
      /receive tournament notice, book venues and compete with your neighbors in events\./i
    )
  ).toBeInTheDocument();
});

test('navigates to /pages/onboard3 when next button is clicked', () => {
  render(<ShowUp />);
  const nextButton = screen.getByRole('button', { name: /next/i });
  fireEvent.click(nextButton);
  expect(mockNavigate).toHaveBeenCalledWith('/pages/onboard3');
});
