// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { TextEncoder } = require("util");

module.exports = {
  collectCoverageFrom: [
    "lib/**/*.ts"
  ],
  rootDir: "./",
  modulePathIgnorePatterns: [
    "/node_modules/",
    "/.github/",
    "/dist/",
  ],
  globals: {
    "TextEncoder": TextEncoder
  },
  // roots: ["<rootDir>/lib/", "<rootDir>/__tests__/", "<rootDir>/__mocks__/"],
  roots: ["<rootDir>/lib/", "<rootDir>/__tests__/"],
  transform: {
    "\\.ts$": ["babel-jest", { configFile: "./babel-jest.config.js" }]
  }
};
