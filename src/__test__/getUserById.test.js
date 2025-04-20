import getUserById from '../adminResources/getUserById';

describe('getUserById', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // mock fetch
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends a POST request and returns user data', async () => {
    const mockUser = { id: '123', name: 'Test User', publicMetadata: { role: 'admin' } };

    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUser),
    });

    const result = await getUserById('123');

    expect(fetch).toHaveBeenCalledWith(
      'https://back-end-strive-sports.vercel.app/user/byId',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '123' }),
      }
    );

    expect(result).toEqual(mockUser);
  });

  it('returns 0 when user is not found or fetch fails', async () => {
    // Simulate a failed fetch
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(0),
    });

    const result = await getUserById('nonexistent-id');
    expect(result).toBe(0);
  });
});
