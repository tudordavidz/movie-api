module.exports = {
  preset: "ts-jest", // Tell Jest to use ts-jest for transforming TypeScript files
  testEnvironment: "node", // Use Node.js as the environment for tests
  roots: ["<rootDir>/src/tests"], // Look for test files in the 'src/tests' folder
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files with ts-jest
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // Look for these file extensions
  testMatch: [
    "**/integration/**/*.test.ts", // Match test files in the 'integration' folder
    "**/unit/**/*.test.ts", // Match test files in the 'unit' folder
  ],
};
