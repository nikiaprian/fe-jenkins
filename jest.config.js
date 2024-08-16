module.exports = {
    transformIgnorePatterns: [
      "node_modules/(?!(react-dnd|react-dnd-html5-backend|react-tag-input)/)"
    ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
  };
  