import { mockUser } from './mockUser';

export const getProfile = vi.fn(async (token) => {
  if (!token || token === 'invalid') {
    throw new Error('Invalid token');
  }

  return mockUser;
});

export const loginUser = vi.fn(async (email, password) => {
  return {
    token: 'mock-token',
    user: mockUser,
  };
});

export const registerUser = vi.fn(async (name, email, password) => {
  return {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjVjZWMzZC00NzUwLTRhM2ItOGZjMy03ZDllMTY4MmE0YTMiLCJ1c2VybmFtZSI6Im91cmN1c3RvbWVybmFtZSIsImlhdCI6MTc0NDI5NjIyMiwiZXhwIjoxNzQ0Mjk5ODIyfQ.L-9bvbkQ5efS5WbxMUo3bfzgY6BAqT99PA42IWULgU4',
  };
});
