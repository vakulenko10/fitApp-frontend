import React from 'react';
import { render } from '@testing-library/react';
import { AuthContext } from '@/components/auth/AuthWrapper'; // your real context

export function renderWithAuthContext(ui, { providerProps, ...renderOptions } = {}) {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
}