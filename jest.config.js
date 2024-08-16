module.exports = {
    transformIgnorePatterns: [
      "node_modules/(?!react-dnd|react-tag-input)"
    ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
  };
  