module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "jsdom", // Simulate a browser-like environment for testing React components
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Use babel-jest for TypeScript and JavaScript files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file for extending Jest matchers
};


