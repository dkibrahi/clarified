const authObjectMock = {
  createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
  signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
  signInWithEmailAndPassword: jest.fn(() => {
    Promise.resolve(true);
  }),
  authReducer: jest.fn(),
  onAuthStateChanged: jest.fn()
};
const authMock = jest.fn(() => authObjectMock);

export { authMock };