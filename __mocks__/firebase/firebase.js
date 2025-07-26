// __mocks__/firebase/firestore.js
const mockGetDoc = jest.fn().mockImplementation(() => {
  console.log('getDoc called');
  return Promise.resolve({ exists: () => false, data: () => ({}) });
});
const mockGetDocs = jest.fn().mockImplementation(() => {
  console.log('getDocs called');
  return Promise.resolve({ docs: [] });
});
const mockAddDoc = jest.fn().mockImplementation(() => {
  console.log('addDoc called');
  return Promise.resolve(undefined);
});
const mockUpdateDoc = jest.fn().mockImplementation(() => {
  console.log('updateDoc called');
  return Promise.resolve(undefined);
});
const mockDeleteDoc = jest.fn().mockImplementation(() => {
  console.log('deleteDoc called');
  return Promise.resolve(undefined);
});
const mockSetDoc = jest.fn().mockImplementation(() => {
  console.log('setDoc called');
  return Promise.resolve(undefined);
});

module.exports = {
  getFirestore: jest.fn().mockImplementation(() => {
    console.log('getFirestore called');
    return {};
  }),
  doc: jest.fn().mockImplementation((db, collection, id) => {
    console.log('doc called with:', { db, collection, id });
    return { id };
  }),
  collection: jest.fn().mockImplementation((db, path) => {
    console.log('collection called with:', { db, path });
    return { path };
  }),
  query: jest.fn().mockImplementation((ref, ...conditions) => {
    console.log('query called with:', { ref, conditions });
    return { ref, conditions };
  }),
  where: jest.fn().mockImplementation((field, op, value) => {
    console.log('where called with:', { field, op, value });
    return { field, op, value };
  }),
  getDoc: mockGetDoc,
  getDocs: mockGetDocs,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  setDoc: mockSetDoc,
  arrayUnion: jest.fn().mockImplementation((value) => {
    console.log('arrayUnion called with:', value);
    return { type: 'arrayUnion', value };
  }),
};