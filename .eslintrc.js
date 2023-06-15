module.exports = {
  globals: {
    __dirname: true,
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: { "react/react-in-jsx-scope": "off" },
};
