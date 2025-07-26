import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as firestore from 'firebase/firestore';
import Info from '../app/auth/info';


// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: jest.fn().mockImplementation(({ children }) => children),
}));

// Mock expo-router
const mockNavigate = jest.fn();
jest.mock('expo-router', () => ({
  useNavigation: jest.fn().mockReturnValue({ navigate: mockNavigate }),
}));


jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockImplementation(() => {
    console.log('getAuth called');
    return { currentUser: { uid: 'test-uid' } };
  }),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockImplementation(() => {
    console.log('getFirestore called');
    return {};
  }),
  doc: jest.fn().mockImplementation((db, collection, id) => {
    console.log('doc called with:', { db, collection, id });
    return { id };
  }),
  setDoc: jest.fn().mockImplementation((doc, data, options) => {
    console.log('setDoc called with:', { doc, data, options });
    return Promise.resolve(undefined);
  }),
}));

// Mock ../backend/firebase
jest.mock('../backend/firebase', () => ({
  app: {},
}));

describe('Info', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRoute = {
    params: { userEmail: 'test@example.com', otherParams: {} },
  };

  test('Renders structural components correctly', () => {
    const { getByTestId, getByText } = render(<Info route={mockRoute} />);
    expect(getByTestId('info-container')).toBeTruthy();
    expect(getByTestId('logo-image')).toBeTruthy();
    expect(getByTestId('age-input')).toBeTruthy();
    expect(getByTestId('occupation-input')).toBeTruthy();
    expect(getByTestId('interests-input')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
    expect(getByTestId('login-link')).toBeTruthy();
    expect(getByText('Age')).toBeTruthy();
    expect(getByText('Occupation')).toBeTruthy();
    expect(getByText('Interests (comma-separated)')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    expect(getByText('Already have an account? Log In')).toBeTruthy();
  });

  test('Updates input fields correctly', () => {
    const { getByTestId } = render(<Info route={mockRoute} />);
    const ageInput = getByTestId('age-input');
    const occupationInput = getByTestId('occupation-input');
    const interestsInput = getByTestId('interests-input');

    fireEvent.changeText(ageInput, '25');
    fireEvent.changeText(occupationInput, 'Engineer');
    fireEvent.changeText(interestsInput, 'reading, hiking');

    expect(ageInput.props.value).toBe('25');
    expect(occupationInput.props.value).toBe('Engineer');
    expect(interestsInput.props.value).toBe('reading, hiking');
  });

  test('Handles successful save', async () => {
    firestore.setDoc.mockResolvedValue(undefined);

    const { getByTestId } = render(<Info route={mockRoute} />);

    fireEvent.changeText(getByTestId('age-input'), '25');
    fireEvent.changeText(getByTestId('occupation-input'), 'Engineer');
    fireEvent.changeText(getByTestId('interests-input'), 'reading, hiking');
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(
      () => {
        expect(firestore.setDoc).toHaveBeenCalledWith(
          expect.anything(),
          {
            email: 'test@example.com',
            age: '25',
            occupation: 'Engineer',
            interests: ['reading', 'hiking'],
            friends: [],
          },
          { merge: true }
        );
        //expect(Alert.alert).toHaveBeenCalledWith('Success', 'Information saved successfully!');
        //expect(mockNavigate).toHaveBeenCalledWith('Login');
      },
      { timeout: 2000 }
    );
  });
});