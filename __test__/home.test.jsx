/*
// __test__/home.test.jsx
import { render } from '@testing-library/react-native';
import Home from '../app/tabs/home';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
  auth: jest.fn(),
}));

describe('<Home />', () => {
  test('Text renders correctly on Home', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    expect(getByText('Welcome Home')).toBeTruthy();
  });
});
*/

// __test__/home.test.jsx
import { fireEvent, render } from '@testing-library/react-native';
import { signOut } from 'firebase/auth';
import Home from '../app/tabs/home';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('<Home />', () => {
  test('Text renders correctly on Home', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    expect(getByText('Welcome Home')).toBeTruthy();
    expect(getByText('Account Balance')).toBeTruthy();
    expect(getByText('Recent Transactions')).toBeTruthy();
    expect(getByText('Quick Actions')).toBeTruthy();
  });

  test('Log Out button navigates to login', async () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    await fireEvent.press(getByText('Log Out'));
    expect(signOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('login');
  });

  test('Navigates to Deals screen', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    fireEvent.press(getByText('Deals'));
    expect(mockNavigate).toHaveBeenCalledWith('Deals');
  });

  test('Navigates to Expense Tracker screen', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    fireEvent.press(getByText('Expense Tracker'));
    expect(mockNavigate).toHaveBeenCalledWith('Expense Tracker');
  });

  test('Log Out handles signOut failure', async () => {
    jest.spyOn(require('firebase/auth'), 'signOut').mockRejectedValue(new Error('Sign out failed'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { getByText } = render(<Home navigation={mockNavigation} />);
    await fireEvent.press(getByText('Log Out'));
    expect(signOut).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error));
    expect(mockNavigate).toHaveBeenCalledWith('login');
    consoleErrorSpy.mockRestore();
  });

  test('Renders structural components correctly', () => {
    const { getByTestId } = render(<Home navigation={mockNavigation} />);
    expect(getByTestId('safe-area-view')).toBeTruthy();
    //expect(getByTestId('linear-gradient')).toBeTruthy();
    expect(getByTestId('container-view')).toBeTruthy();
  });

  test('Welcome Home text has correct styles', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    const title = getByText('Welcome Home');
    expect(title).toHaveStyle({ fontSize: 28, fontWeight: '600', color: '#FFFFFF' });
  });

  test('Does not crash with undefined navigation', () => {
    const { getByText } = render(<Home navigation={undefined} />);
    expect(getByText('Welcome Home')).toBeTruthy();
  });
});