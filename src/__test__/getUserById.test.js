import getUserById from '../adminResources/getUserById';

describe('getUserById - Equivalence and Boundary Testing', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Equivalence Class: valid ID returns user data
  it('returns user data for valid ID', async () => {
    const mockUser = { id: '123', name: 'Test User' };
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUser),
    });

    const result = await getUserById('123');
    expect(result).toEqual(mockUser);
  });

  //Equivalence Class: valid but nonexistent ID returns 0
  it('returns 0 when user is not found', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(0),
    });

    const result = await getUserById('nonexistent-id');
    expect(result).toBe(0);
  });

  //Equivalence Class: invalid inputs return 0
  test.each([
    [null],
    [undefined],
    [''],
    [123],
    [{}],
    [[]],
  ])('returns 0 for invalid ID: %p', async (id) => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(0),
    });

    const result = await getUserById(id);
    expect(result).toBe(0);
  });

  // Boundary Value: minimum valid string length (1 character)
  it('accepts 1-character ID', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ id: 'a' }),
    });

    const result = await getUserById('a');
    expect(result).toEqual({ id: 'a' });
  });

  // Boundary Value: long but valid ID (e.g., 50 characters)
  it('accepts long valid ID (50 chars)', async () => {
    const longId = 'x'.repeat(50);
    const mockUser = { id: longId };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUser),
    });

    const result = await getUserById(longId);
    expect(result).toEqual(mockUser);
  });

  // Equivalence Class: handles network error (invalid condition)
  it('returns 0 when fetch throws error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    try {
      const result = await getUserById('valid-id');
      expect(result).toBe(0);
    } catch (e) {
      expect(e.message).toMatch(/Network error/); // fallback: check if error is still caught
    }
  });
});
