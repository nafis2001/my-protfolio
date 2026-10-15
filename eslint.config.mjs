import tseslint from 'typescript-eslint';
export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  { files: ['**/*.ts'], rules: { '@typescript-eslint/no-non-null-assertion': 'off' } },
];
