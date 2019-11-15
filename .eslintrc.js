module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "@typescript-eslint/camelcase": "off",
    camelcase: "off",
    "func-names": "off",
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "no-new": "off",
    "no-underscore-dangle": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
