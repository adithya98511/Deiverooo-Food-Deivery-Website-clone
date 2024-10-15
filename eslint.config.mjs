import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint plugin
import tsParser from '@typescript-eslint/parser'; // TypeScript parser
import prettier from 'eslint-plugin-prettier'; // Prettier plugin

export default [
  // Apply configuration to JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist'], // Ignore node_modules and build folders
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Support modern ECMAScript features
        sourceType: 'module', // Support ES modules
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      prettier, // Include Prettier plugin
    },
    rules: {
      'prettier/prettier': 'error', // Prettier errors are reported as ESLint errors
      // Disable ESLint rules that conflict with Prettier
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
  // JavaScript recommended rules
  pluginJs.configs.recommended,
  // TypeScript-specific recommended rules
  tseslintPlugin.configs.recommended,
];
