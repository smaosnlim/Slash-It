/*
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Friends from '../app/tabs/Friends';
//import * as firestore from 'firebase/firestore';
const firestore = require('firebase/firestore');

// Mock react-native components

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: jest.fn().mockImplementation(({ children }) => children),
}));

// Mock expo-router
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

// Mock firebase/auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockImplementation(() => {
    console.log('getAuth called');
    return { currentUser: { uid: 'test-uid' } };
  }),
}));

// Mock ../backend/firebase
jest.mock('../backend/firebase', () => ({
  app: {},
}));

describe('Friends', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firestore.getDoc.mockReset();
    firestore.getDocs.mockReset();
    firestore.addDoc.mockReset();
    firestore.updateDoc.mockReset();
    firestore.deleteDoc.mockReset();
    firestore.setDoc.mockReset();
  });

  test('Renders structural components correctly', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({ docs: [] });

    const { getByTestId, getByText, getByPlaceholderText } = render(<Friends navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByTestId('friends-container')).toBeTruthy();
      expect(getByTestId('friends-title')).toBeTruthy();
      expect(getByPlaceholderText('Search by username')).toBeTruthy();
      expect(getByTestId('notification-button')).toBeTruthy();
      expect(getByTestId('search-results-card')).toBeTruthy();
      expect(getByTestId('search-results-title')).toBeTruthy();
      expect(getByTestId('friends-list-card')).toBeTruthy();
      expect(getByTestId('friends-list-title')).toBeTruthy();
      expect(getByTestId('no-friends-text')).toBeTruthy();
      expect(getByTestId('home-button')).toBeTruthy();
      expect(getByTestId('home-button-text')).toBeTruthy();
    }, { timeout: 5000 });
  });

  test('Handles search functionality', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({
      docs: [
        { id: 'user2', data: () => ({ email: 'friend@example.com' }) },
      ],
    });

    const { getByTestId } = render(<Friends navigation={mockNavigation} />);

    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'friend@example.com');

    await waitFor(() => {
      expect(firestore.query).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ field: 'email', op: '==', value: 'friend@example.com' })
      );
      expect(getByTestId('search-result-email-user2')).toBeTruthy();
    }, { timeout: 5000 });
  });

  test('Sends friend request', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({
      docs: [
        { id: 'user2', data: () => ({ email: 'friend@example.com' }) },
      ],
    });

    const { getByTestId } = render(<Friends navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('search-input'), 'friend@example.com');
    fireEvent.press(getByTestId('add-friend-user2'));

    await waitFor(() => {
      expect(firestore.addDoc).toHaveBeenCalledWith(
        expect.anything(),
        {
          fromUserId: 'test-uid',
          toUserId: 'user2',
          status: 'pending',
        }
      );
      expect(Alert.alert).toHaveBeenCalledWith('Friend request sent!');
    }, { timeout: 5000 });
  });

  test('Fetches friends list', async () => {
    firestore.getDoc
      .mockResolvedValueOnce({ exists: () => true, data: () => ({ friends: ['user2'] }) })
      .mockResolvedValueOnce({ exists: () => true, data: () => ({ email: 'friend@example.com' }) });
    firestore.getDocs.mockResolvedValue({ docs: [] });

    const { getByTestId } = render(<Friends navigation={mockNavigation} />);

    await waitFor(() => {
      expect(firestore.getDoc).toHaveBeenCalledWith(expect.objectContaining({ id: 'test-uid' }));
      expect(firestore.getDoc).toHaveBeenCalledWith(expect.objectContaining({ id: 'user2' }));
      expect(getByTestId('friend-email-user2')).toBeTruthy();
    }, { timeout: 5000 });
  });

  test('Accepts friend request', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({
      docs: [
        { id: 'req1', data: () => ({ fromUserId: 'user2', toUserId: 'test-uid', status: 'pending' }) },
      ],
    });
    firestore.getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ email: 'friend@example.com' }) });

    const { getByTestId } = render(<Friends navigation={mockNavigation} />);

    fireEvent.press(getByTestId('notification-button'));
    fireEvent.press(getByTestId('accept-request-req1'));

    await waitFor(() => {
      expect(firestore.updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'req1' }),
        { status: 'accepted' }
      );
      expect(firestore.updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'test-uid' }),
        { friends: { type: 'arrayUnion', value: 'user2' } }
      );
      expect(firestore.updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'user2' }),
        { friends: { type: 'arrayUnion', value: 'test-uid' } }
      );
      expect(Alert.alert).toHaveBeenCalledWith('Friend request accepted!');
    }, { timeout: 5000 });
  });

  test('Rejects friend request', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({
      docs: [
        { id: 'req1', data: () => ({ fromUserId: 'user2', toUserId: 'test-uid', status: 'pending' }) },
      ],
    });
    firestore.getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ email: 'friend@example.com' }) });

    const { getByTestId } = render(<Friends navigation={mockNavigation} />);

    fireEvent.press(getByTestId('notification-button'));
    fireEvent.press(getByTestId('reject-request-req1'));

    await waitFor(() => {
      expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ id: 'req1' }));
      expect(Alert.alert).toHaveBeenCalledWith('Friend request rejected.');
    }, { timeout: 5000 });
  });

  test('Toggles friend request overlay', async () => {
    firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ friends: [] }) });
    firestore.getDocs.mockResolvedValue({ docs: [] });

    const { getByTestId, queryByTestId } = render(<Friends navigation={mockNavigation} />);

    expect(queryByTestId('overlay')).toBeNull();

    fireEvent.press(getByTestId('notification-button'));

    await waitFor(() => {
      expect(getByTestId('overlay')).toBeTruthy();
      expect(getByTestId('overlay-title')).toBeTruthy();
      expect(getByTestId('close-overlay-button')).toBeTruthy();
    }, { timeout: 5000 });

    fireEvent.press(getByTestId('close-overlay-button'));

    await waitFor(() => {
      expect(queryByTestId('overlay')).toBeNull();
    }, { timeout: 5000 });
  });
});
*/