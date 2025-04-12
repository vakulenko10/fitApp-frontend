
import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithAuthContext } from '@/testing/test-utils';
import Header from '@/components/navigation/Header';
import { MemoryRouter } from 'react-router-dom';
import store from '@/redux/store';
import { mockUser } from '@/__mocks__/lib/mockUser';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  const defaultAuthProps = {
    user: { ...mockUser, isAuthenticated: true },
    token: 'mock-token',
    setUser: vi.fn(),
    setToken: vi.fn(),
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
    googleAuth: vi.fn(),
  };

  const unauthProps = {
    ...defaultAuthProps,
    user: { isAuthenticated: false },
  };

  const renderHeader = (authProps = defaultAuthProps) => {
    return renderWithAuthContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { providerProps: authProps, reduxStore: store }
    );
  };

  test('renders both Sign in and Sign up buttons when unauthenticated', () => {
    renderHeader(unauthProps);

    const signInButtons = screen.getAllByLabelText('sign-in-header-btn');
    const signUpButtons = screen.getAllByLabelText('sign-up-header-btn');

    expect(signInButtons.length).toBeGreaterThan(0);
    expect(signUpButtons.length).toBeGreaterThan(0);

    // Optionally, test first instance:
    expect(signInButtons[0]).toBeInTheDocument();
    expect(signUpButtons[0]).toBeInTheDocument();
  });

  test('renders logout buttons and avatar when authenticated', () => {
    renderHeader();

    const logoutButtons = screen.getAllByLabelText('log-out-header-btn');
    expect(logoutButtons.length).toBeGreaterThan(0);

    // Avatar should exist
    expect(screen.getByLabelText('profile-image')).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    const logoutFn = vi.fn();
    renderHeader({ ...defaultAuthProps, logout: logoutFn });

    const logoutButtons = screen.getAllByLabelText('log-out-header-btn');

    fireEvent.click(logoutButtons[0]); // Click first logout button (desktop)
    expect(logoutFn).toHaveBeenCalled();
  });

  test('mobile menu toggles and contains navigation links', () => {
    renderHeader();

    const burgerIcon = screen.getAllByRole('button')[0]; // Grab the mobile menu icon
    fireEvent.click(burgerIcon);

    const links = screen.getAllByText('Home');
    expect(links.length).toBeGreaterThan(1); // Both desktop and mobile
    expect(links[1]).toBeVisible(); // Mobile version
  });
  test('measures unauthanticated user Header render time', () => {
    const start = performance.now();
    renderHeader(unauthProps);
    const end = performance.now();
    const renderTime = end - start;
  
    console.log(`Unauthenticated header rendered in ${renderTime.toFixed(2)} ms`);
  });
  test('measures Header render time', () => {
    const start = performance.now();
    renderHeader();
    const end = performance.now();
    const renderTime = end - start;
  
    console.log(`Authenticated header rendered in ${renderTime.toFixed(2)} ms`);
  });
});

// import { screen, fireEvent } from '@testing-library/react';
// import { vi } from 'vitest';
// import { renderWithAuthContext } from '@/testing/test-utils';
// import Header from '@/components/navigation/Header';
// import { MemoryRouter } from 'react-router-dom';
// import store from '@/redux/store';
// import { mockUser } from '@/__mocks__/lib/mockUser';
// import '@testing-library/jest-dom';

// describe('Header Component', () => {
//   const defaultAuthProps = {
//     user: {...mockUser, isAuthenticated: true},
//     token: 'mock-token',
//     setUser: vi.fn(),
//     setToken: vi.fn(),
//     login: vi.fn(),
//     signup: vi.fn(),
//     logout: vi.fn(),
//     googleAuth: vi.fn(),
//   };

//   const unauthProps = {
//     ...defaultAuthProps,
//     user: { isAuthenticated: false },
//   };

//   const renderHeader = (authProps = defaultAuthProps) => {
//     return renderWithAuthContext(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>,
//       { providerProps: authProps, reduxStore: store }
//     );
//   };

//   test('renders header with user avatar and logout button when authenticated', () => {
//     renderHeader();

   
//     expect(screen.getAllByLabelText('log-out-header-btn')).toBeInTheDocument();
//     expect(screen.getByRole('img')).toBeInTheDocument(); // Avatar image
//   });

//   test('renders Sign in and Sign up buttons when unauthenticated', () => {
//     renderHeader(unauthProps);
//     expect(screen.getAllByLabelText('sign-in-header-btn')).toBeInTheDocument();
//     expect(screen.getAllByLabelText('sign-up-header-btn')).toBeInTheDocument();
//   });

// //   test('renders menu links based on user authentication and config', () => {
// //     renderHeader();

// //     expect(screen.getByText('Home')).toBeInTheDocument();
// //     expect(screen.getByText('About')).toBeInTheDocument();
// //     expect(screen.getByText('Create Recipe')).toBeInTheDocument();
// //     expect(screen.getByText('FAQ')).toBeInTheDocument();
// //     expect(screen.getByText('Profile')).toBeInTheDocument();
// //   });

// //   test('mobile menu toggles when burger icon is clicked', () => {
// //     renderHeader();

// //     const burgerButton = screen.getAllByRole('button')[0];
// //     fireEvent.click(burgerButton);

// //     expect(screen.getByText('Home')).toBeVisible();
// //     fireEvent.click(screen.getByText('Home')); // closes on link click
// //   });

// //   test('calls logout function on logout button click', () => {
// //     const logoutFn = vi.fn();
// //     renderHeader({ ...defaultAuthProps, logout: logoutFn });

// //     fireEvent.click(screen.getByRole('button', { name: /log out/i }));
// //     expect(logoutFn).toHaveBeenCalled();
// //   });
// });
