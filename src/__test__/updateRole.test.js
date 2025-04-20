import updateRole from '../adminResources/updateRole';
import removeConfigMenu from '../adminResources/removeConfigMenu';

// Mock removeConfigMenu
jest.mock('../adminResources/removeConfigMenu');

describe('updateRole', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => 'test-user-id');
    Storage.prototype.setItem = jest.fn();

    // Mock fetch
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

  it('sends PUT request to update user role and clears userId from localStorage', async () => {
    await updateRole('admin');

    expect(fetch).toHaveBeenCalledWith(
      'https://back-end-strive-sports.vercel.app/users/roleUpdate',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'test-user-id',
          role: 'admin',
        }),
      }
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();
  });

  it('handles fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await updateRole('resident');

    expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', null);
    expect(removeConfigMenu).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
