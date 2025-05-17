import updateRole from '../adminResources/updateRole';
import removeConfigMenu from '../adminResources/removeConfigMenu';

jest.mock('../adminResources/removeConfigMenu');

describe('updateRole - Unit Tests', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'test-user-id');
    Storage.prototype.setItem = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Equivalence Partition: Valid roles
  const validRoles = ['admin', 'resident', 'Facility staff', 'none', 'removed'];
  test.each(validRoles)('sends PUT request correctly for valid role "%s"', async (role) => {
    await updateRole(role);

    expect(fetch).toHaveBeenCalledWith(
      'https://back-end-strive-sports.vercel.app/users/roleUpdate',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'test-user-id', role }),
      }
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  // Boundary Case: Empty role
  it('handles empty string role gracefully', async () => {
    await updateRole('');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ id: 'test-user-id', role: '' }),
      })
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  // Boundary Case: Null role
  it('handles null role without crashing', async () => {
    await updateRole(null);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ id: 'test-user-id', role: null }),
      })
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  //Error case: network failure
  it('logs error and still cleans up when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await updateRole('admin');

    expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  // Edge case: userId not found
  it('handles missing userId in localStorage', async () => {
    Storage.prototype.getItem = jest.fn(() => null);

    await updateRole('resident');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ id: null, role: 'resident' }),
      })
    );
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  //Invalid type: number
  it('handles number as role type', async () => {
    await updateRole(123);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ id: 'test-user-id', role: 123 }),
      })
    );
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  //Invalid type: object
  it('handles object as role type', async () => {
    const invalidRole = { type: 'admin' };

    await updateRole(invalidRole);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ id: 'test-user-id', role: invalidRole }),
      })
    );
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });
});
