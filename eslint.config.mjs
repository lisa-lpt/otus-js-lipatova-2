import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // Базовые правила ESLint
  js.configs.recommended,

  // Основной конфиг проекта
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-empty': 'off',
    },
  },

  {
    files: ['src/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.jest },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-empty': 'off',
    },
  },

  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-empty': 'off',
    },
  },

  // Prettier как правило ESLint
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },

  // Отключает конфликтующие правила ESLint
  prettierConfig,
];
