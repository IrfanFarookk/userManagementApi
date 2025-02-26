module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    collectCoverageFrom: [
      "src/**/*.ts",
      "!src/models/*",
      "!src/**/*.test.ts",
    ]
  };
  