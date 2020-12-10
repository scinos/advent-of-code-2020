module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: false,
    es6: true,
  },
  extends: [
    "airbnb-base",

    "plugin:@typescript-eslint/recommended",

    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",

    "plugin:mocha/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["mocha"],
  rules: {
    "import/extensions": ["error", "never"],
    "mocha/no-mocha-arrows": "off",
    "no-case-declarations": "off",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-continue": "off",
    "no-empty": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "no-throw-literal": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["test.ts"],
      env: {
        mocha: true,
      },
    },
    {
      files: ["*.ts"],
    },
  ],
};
