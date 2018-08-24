module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: ["vue", "html"],
  extends: ["eslint:recommended", "plugin:vue/essential", "prettier"],

  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "constructor-super": "warn",
    "valid-typeof": "warn"
  }
};
