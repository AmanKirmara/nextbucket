module.exports = {
    env: {
      node: true,  // Node.js global variables and Node.js scoping
      es2021: true,  // Enables ES2021 features
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',  // TypeScript rules
      'plugin:prettier/recommended',  // Integrates Prettier with ESLint
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,  // Enables ES2021 features
      sourceType: 'module',  // Allows using imports
    },
    plugins: ['@typescript-eslint'],  // TypeScript ESLint plugin
    rules: {
      // Enforce consistent indentation
      'indent': ['error', 2],
  
      // Enforce consistent linebreak style
      'linebreak-style': ['error', 'unix'],
  
      // Enforce the use of single quotes
      'quotes': ['error', 'single'],
  
      // Disallow trailing commas
      'comma-dangle': ['error', 'never'],
  
      // Enforce consistent spacing before and after keywords
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
  
      // Enforce consistent spacing inside curly braces
      'object-curly-spacing': ['error', 'always'],
  
      // Disallow unnecessary parentheses
      'no-extra-parens': ['error', 'all'],
  
      // Enforce consistent return statements
      'consistent-return': 'error',
  
      // Enforce consistent use of function declarations vs. function expressions
      'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
  
      // Disallow the use of console (for production code)
      'no-console': 'warn',
  
      // Enforce using `const` for variables that are never reassigned
      'prefer-const': 'error',
  
      // Ensure promises are handled correctly
      'promise/catch-or-return': 'error',
      'promise/always-return': 'error',
  
      // Enforce consistent use of semi
      'semi': ['error', 'always'],
  
      // Additional Prettier rules
      'prettier/prettier': [
        'error',
        {
          'endOfLine': 'auto',
          'singleQuote': true,
          'trailingComma': 'all',
          'tabWidth': 2,
          'semi': true,
          'printWidth': 80,
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.json'],
        },
      },
    },
  };
  