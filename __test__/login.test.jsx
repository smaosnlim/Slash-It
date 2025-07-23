
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Login from '../app/auth/login';

// Mock Alert
/*
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
*/

// Mock firebase.js to provide auth
jest.mock('../backend/firebase', () => ({
  auth: {},
}));

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders structural components correctly', () => {
    const { getByTestId, getByText } = render(<Login navigation={mockNavigation} />);
    expect(getByTestId('login-container')).toBeTruthy();
    expect(getByTestId('logo-image')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
    expect(getByTestId('signup-link')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  test('Updates email and password inputs correctly', () => {
    const { getByTestId } = render(<Login navigation={mockNavigation} />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  test('Handles successful login', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    const { getByTestId } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'testing@gmail.com');
    fireEvent.changeText(getByTestId('password-input'), 'abcdefg');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'testing@gmail.com',
        'abcdefg'
      );
      
      expect(mockNavigate).toHaveBeenCalledWith('home');
    });
  });

  test('Handles login failure', async () => {
    const error = new Error('Invalid credentials');
    signInWithEmailAndPassword.mockRejectedValueOnce(error);
    const { getByTestId } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('Navigates to signup screen', () => {
    const { getByTestId } = render(<Login navigation={mockNavigation} />);
    fireEvent.press(getByTestId('signup-link'));
    expect(mockNavigate).toHaveBeenCalledWith('signup');
  });

  test('Renders with empty navigation prop gracefully', () => {
    const { getByTestId } = render(<Login navigation={undefined} />);
    expect(getByTestId('login-container')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });
});
