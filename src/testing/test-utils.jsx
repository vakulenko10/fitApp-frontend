import React from 'react';
import { render } from '@testing-library/react';
import { AuthContext } from '@/components/auth/AuthWrapper';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';

export function renderWithAuthContext(
  ui,
  {
    providerProps = {
      user: { isAuthenticated: false },
      setUser: () => {},
      setToken: () => {},
      token: null,
      login: () => {},
      signup: () => {},
      logout: () => {},
      googleAuth: () => {},
    },
    reduxStore = store,
    ...renderOptions
  } = {}
) {
  return render(
    <ReduxProvider store={reduxStore}>
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>
    </ReduxProvider>,
    renderOptions
  );
}
