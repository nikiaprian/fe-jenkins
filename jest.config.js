module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-dnd|react-dnd-html5-backend|react-tag-input)/)",
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^@toast-ui/react-editor$': '<rootDir>/__mocks__/toast-ui-editor.js',
  },
  
  testEnvironment: 'jsdom',
};
