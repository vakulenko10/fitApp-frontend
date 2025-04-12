import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '@/pages/Home/Home';
import { renderWithAuthContext } from '@/testing/test-utils';
import '@testing-library/jest-dom';
import store from '@/redux/store';
import { mockUser } from '@/__mocks__/lib/mockUser';
import { MemoryRouter } from 'react-router-dom';
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
  return renderWithAuthContext(<MemoryRouter><Home /></MemoryRouter>, { providerProps: authProps, reduxStore: store });
};

describe('Home Component UI Tests', () => {
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
  test('closes modal when clicking "No"', async () => {
    renderHome();
  
    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/cm/i), { target: { value: 175 } });
    fireEvent.change(screen.getByLabelText(/kg/i), { target: { value: 70 } });
  
    // fireEvent.click(screen.getByRole('button', { name: /Lose Weight/i }));
    // fireEvent.click(screen.getByRole('button', { name: /Moderate/i }));
  
    // fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    fireEvent.click(screen.getByText(/Lose Weight/i));  
    fireEvent.click(screen.getByText(/Moderate/i));  
    fireEvent.click(screen.getByText(/Calculate/i)); 
  
    await waitFor(() =>
      expect(screen.getByText(/Daily Caloric Intake:/i)).toBeInTheDocument()
    );
  
    fireEvent.click(screen.getByRole('button', { name: /^No$/i }));
  
    await waitFor(() => {
      expect(screen.queryByText(/Daily Caloric Intake:/i)).not.toBeInTheDocument();
    });
  });
});
describe('Home Component Validation Tests', () => {
  test('shows validation errors when required fields are empty', async () => {
    renderHome();
  
    // Clear inputs to simulate empty submission
    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/cm/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/kg/i), { target: { value: '' } });
  
    // fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    fireEvent.click(screen.getByText(/Calculate/i)); 
  
    await waitFor(() => {
      expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Height is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight is required/i)).toBeInTheDocument();
    });
  });
  test('shows error if age is too low', async () => {
    renderHome();
  
    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: 15 } });
    fireEvent.change(screen.getByLabelText(/cm/i), { target: { value: 170 } });
    fireEvent.change(screen.getByLabelText(/kg/i), { target: { value: 60 } });
  
    fireEvent.click(screen.getByText(/Calculate/i));
  
    await waitFor(() => {
      expect(screen.getByText(/Age must be at least 18/i)).toBeInTheDocument();
    });
  });
})
