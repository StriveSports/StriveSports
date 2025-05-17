// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
process.env.VITE_API_URL = 'https://strivesportsbackend.onrender.com';

