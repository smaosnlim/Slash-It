// __mocks__/firebaseMock.js
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  auth: { currentUser: null },
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(() => ({})),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));