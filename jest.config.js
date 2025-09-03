module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

