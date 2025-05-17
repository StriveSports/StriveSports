// PostEvent.test.js
import PostEvent from '../adminResources/PostEvent'; // adjust path as needed
import '@testing-library/jest-dom';

global.fetch = jest.fn();
global.alert = jest.fn();
console.error = jest.fn();

describe('PostEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_API_URL = 'https://strivesportsbackend.onrender.com';
  });

  test('sends correct payload and shows success alert (equivalence test)', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await PostEvent();

    expect(fetch).toHaveBeenCalledWith(
      'https://strivesportsbackend.onrender.com/events',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'test',
          date: '2025-05-07',
          time_from: '10:00',
          time_to: '17:00',
          event_description: 'testing event',
        }),
      }
    );

    expect(alert).toHaveBeenCalledWith('Event posted successfully!');
  });

  test('handles failed fetch response (boundary test)', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await PostEvent();

    expect(console.error).toHaveBeenCalledWith('Failed to post event.');
    expect(alert).toHaveBeenCalledWith('Failed to post event. Please try again later.');
  });


});
