module.exports = {
  "import/no-extraneous-dependencies": [
    "error",
    {
      devDependencies: false,
      optionalDependencies: false,
      peerDependencies: false,
      packageDir: ___dirname,
    },
  ],

  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: { "react/react-in-jsx-scope": "off" },
};
