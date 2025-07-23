import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignUp from '../app/auth/signup';

// Mock firebase.js to provide auth (virtual mock until file path is confirmed)
jest.mock('../backend/firebase', () => ({
  auth: {},
}), { virtual: true });

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('SignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders structural components correctly', () => {
    const { getByTestId, getByText } = render(<SignUp navigation={mockNavigation} />);
    expect(getByTestId('signup-container')).toBeTruthy();
    expect(getByTestId('logo-image')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('confirm-password-input')).toBeTruthy();
    expect(getByTestId('signup-button')).toBeTruthy();
    expect(getByTestId('login-link')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Re-enter Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Log In')).toBeTruthy();
  });

  test('Updates input fields correctly', () => {
    const { getByTestId } = render(<SignUp navigation={mockNavigation} />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmPasswordInput.props.value).toBe('password123');
  });

  test('Handles successful signup', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123' } });
    const { getByTestId } = render(<SignUp navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      //expect(Alert.alert).toHaveBeenCalledWith('Success', 'Account created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('Info', { userEmail: 'test@example.com' });
    });
  });

  test('Shows error for mismatched passwords', async () => {
    const { getByTestId } = render(<SignUp navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password456');
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
      //expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});