import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithAuthContext } from '@/testing/test-utils.js';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Home from '@/pages/Home/Home.jsx';

const mockUser = {
  name: 'Test User',
  age: 28,
  gender: 'male',
  weight: 80,
  height: 180,
  isAuthenticated: true,
  currentCalorieIntake: 2000,
};

const mockContext = {
  user: mockUser,
  setUser: vi.fn(),
  token: 'mock-token',
  setToken: vi.fn(),
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  googleAuth: vi.fn(),
};

describe('<Home /> Page', () => {
  test('renders form and fills default values', async () => {
    renderWithAuthContext(
      <Provider store={store}>
        <Home />
      </Provider>,
      { providerProps: mockContext }
    );

    // Check heading and instructions
    expect(screen.getByText(/Daily Calorie Intake Calculator/i)).toBeInTheDocument();

    // Check if gender button is selected by default
    expect(screen.getByRole('button', { name: /Male/i })).toHaveClass('bg-primary');

    // Check if age input contains default value
    const ageInput = screen.getByLabelText(/Years/i);
    expect(ageInput.value).toBe('28');
  });

  test('submits form and shows modal', async () => {
    renderWithAuthContext(
      <Provider store={store}>
        <Home />
      </Provider>,
      { providerProps: mockContext }
    );

    const button = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Daily Caloric Intake:/i)).toBeInTheDocument();
      expect(screen.getByText(/Would you like to create a recipe/i)).toBeInTheDocument();
    });
  });

  test('shows login/register message if user is not authenticated', async () => {
    const guestContext = { ...mockContext, user: null };

    renderWithAuthContext(
      <Provider store={store}>
        <Home />
      </Provider>,
      { providerProps: guestContext }
    );

    const calculate = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(calculate);

    await waitFor(() => {
      expect(
        screen.getByText(/Log in or register to save your calorie intake results/i)
      ).toBeInTheDocument();
    });
  });
});
