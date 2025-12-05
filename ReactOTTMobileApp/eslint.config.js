/**
 * ESLint flat config for Expo React Native with TypeScript on ESLint v9.
 * - Uses @typescript-eslint/parser for TS files.
 * - Removes unsupported 'ecmaFeatures' key (JSX is detected by extensions).
 */
const tsParser = require("@typescript-eslint/parser");

const sharedGlobals = {
  window: "readonly",
  document: "readonly",
  console: "readonly",
  navigator: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  requestAnimationFrame: "readonly",
  cancelAnimationFrame: "readonly",
  fetch: "readonly",
  FormData: "readonly",
  module: "readonly",
  require: "readonly",
  __dirname: "readonly",
  process: "readonly",
};

module.exports = [
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: sharedGlobals,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-console": "off",
    },
  },
  // TypeScript files
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        // No project required to avoid TS project lookup in CI
      },
      globals: sharedGlobals,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-console": "off",
    },
  },
];
