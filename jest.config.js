const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // Ignore the dist folder to prevent module name collisions
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testTimeout: 30000,
};
