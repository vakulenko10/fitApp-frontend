import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '@/pages/Home/Home';
import { renderWithAuthContext } from '@/testing/test-utils';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { mockUser } from '@/__mocks__/lib/mockUser';

// Mock calorie calculator result
vi.mock('@/lib/calorieIntake', () => ({
  calculateCalorieIntake: vi.fn(() => ({
    calorieIntake: 2200,
    macronutrients: {
      protein: 100,
      fats: 70,
      carbs: 250,
      fiber: 30,
    },
  })),
}));

// Mock notification hook
vi.mock('@/hooks/UseNotification', () => ({
  useNotification: () => ({
    triggerToast: vi.fn(),
  }),
}));


const defaultAuthProps = {
  user: mockUser,
  token: 'mock-token',
  setUser: vi.fn(),
  setToken: vi.fn(),
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  googleAuth: vi.fn(),
};

const renderHome = (authProps = defaultAuthProps) => {
  return renderWithAuthContext(<Home />, { providerProps: authProps, reduxStore: store });
};

describe('Home Component', () => {
  test('renders form and inputs', () => {
    renderHome();
    expect(screen.getByText(/Daily Calorie Intake Calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Years/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kg/i)).toBeInTheDocument();
  });

  test('calculates calorie intake and opens modal for authenticated user', async () => {

    renderHome();

    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/cm/i), { target: { value: 175 } });
    fireEvent.change(screen.getByLabelText(/kg/i), { target: { value: 70 } });

    fireEvent.click(screen.getByRole('button', { name: /Lose Weight/i }));
    fireEvent.click(screen.getByRole('button', { name: /Moderate/i }));

    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    await waitFor(() =>
      expect(screen.getByText(/Daily Caloric Intake:/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/2200 kcal/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Would you like to create a recipe/i)
    ).toBeInTheDocument();
  });

  test('shows login prompt in modal for unauthenticated user', async () => {
    renderHome();
    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/cm/i), { target: { value: 175 } });
    fireEvent.change(screen.getByLabelText(/kg/i), { target: { value: 70 } });

    fireEvent.click(screen.getByRole('button', { name: /Lose Weight/i }));
    fireEvent.click(screen.getByRole('button', { name: /Moderate/i }));
    
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    await waitFor(() =>
      expect(screen.getByText(/Daily Caloric Intake:/i)).toBeInTheDocument()
    );

    expect(
      screen.getByText(/Log in or register to save your calorie intake results!/i)
    ).toBeInTheDocument();
  });
});
