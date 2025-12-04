/* Minimal CommonJS ESLint flat config to avoid external module resolution during CI */
module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      // Basic browser-like globals to prevent reference errors without importing 'globals'
      globals: {
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
      },
    },
    rules: {
      // Keep rules minimal to avoid requiring plugins
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
    },
  },
];
