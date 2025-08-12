import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs as tscConfigs } from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    'node_modules',
    'dist',
  ]),
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tscConfigs.recommended,
      ...tscConfigs.stylistic,
    ],
    rules: {
      semi: 'error',
      'no-self-assign': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/no-unused-expressions': ['warn', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      }],

      quotes: ['warn', 'single', { avoidEscape: true }],

      'new-parens': 'warn',
      eqeqeq: ['error', 'always'],

      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off', // ["warn", "index-signature"],

      'no-cond-assign': ['error', 'always']
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [
      js.configs.recommended,
    ],
    rules: {
      semi: 'error',
      quotes: ['warn', 'single', { avoidEscape: true }],
      eqeqeq: ['error', 'always'],
    },
  }
]);
