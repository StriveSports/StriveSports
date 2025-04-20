module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mock styles
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // mock images
  },
  testEnvironment: "jsdom", silent: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};