module.exports = {
  parser: '@typescript-eslint/parser', // TypeScript 파서 지정
  extends: [
    'plugin:@typescript-eslint/eslint-plugin/recommended', // TypeScript 권장 규칙 사용
    'plugin:eslint-plugin-react/recommended', // React 권장 규칙 사용
    'plugin:eslint-plugin-prettier/recommended', // Prettier 플러그인 사용
  ],
  plugins: ['eslint-plugin-simple-import-sort'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          [
            // Node.js builtins prefixed with `node:`.
            '^node:',
            // React-related packages.
            '^react$',
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            '^@?\\w',
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            '^',
            // Relative imports.
            // Anything that starts with a dot.
            '^\\.',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
  root: true,
};
