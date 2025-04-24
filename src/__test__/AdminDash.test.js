import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../adminResources/AdminDashboard.jsx';
import '@testing-library/jest-dom';

jest.mock('../adminResources/loadUsers.jsx', () => jest.fn());
jest.mock('../adminResources/updateRole.jsx', () => jest.fn());
jest.mock('../adminResources/removeConfigMenu.jsx', () => jest.fn());

import loadUsers from '../adminResources/loadUsers.jsx';
import updateRole from '../adminResources/updateRole.jsx';
import removeConfigMenu from '../adminResources/removeConfigMenu.jsx';

jest.mock('@clerk/clerk-react', () => ({
  UserButton: () => <div>UserButton</div>,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders admin dashboard heading', () => {
  render(<AdminDashboard />);
  expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
});

test('calls loadUsers when load users button is clicked', () => {
  render(<AdminDashboard />);
  const loadButton = screen.getByRole('button', { name: /load users/i });
  fireEvent.click(loadButton);
  expect(loadUsers).toHaveBeenCalled();
});

test.each([
  ['Facility staff', /facility staff/i],
  ['resident', /resident/i],
  ['admin', /admin/i],
  ['none', /none/i],
  ['removed', /removed/i],
])('calls updateRole with "%s" when corresponding button is clicked', (role, regex) => {
  render(<AdminDashboard />);
  const button = screen.getByRole('button', { name: regex });
  fireEvent.click(button);
  expect(updateRole).toHaveBeenCalledWith(role);
});

test('calls removeConfigMenu when complete button is clicked', () => {
  render(<AdminDashboard />);
  const completeButton = screen.getByRole('button', { name: /complete/i });
  fireEvent.click(completeButton);
  expect(removeConfigMenu).toHaveBeenCalled();
});
