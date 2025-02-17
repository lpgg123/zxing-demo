module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue"],
  rules: {
    "no-var": "error",
    "no-unused-vars": "error",
    "no-debugger": 0,
    camelcase: "error",
    "no-console": 0,
  },
};
