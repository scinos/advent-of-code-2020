module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: false,
    es6: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:mocha/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["mocha"],
  rules: {
    "import/extensions": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-case-declarations": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "mocha/no-mocha-arrows": "off",
    "class-methods-use-this": "off",
    "no-continue": "off",
    "func-names": "off",
    "default-case": "off",
    "max-classes-per-file": "off",
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
