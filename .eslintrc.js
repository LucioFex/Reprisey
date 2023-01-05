module.exports = {
    extends: [
        'airbnb-base',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    root: true,
    rules: {
        'no-console': 'warn',
        indent: ['warn', 4],
        'linebreak-style': ['off', 'windows'],
        'no-continue': 'off',
        radix: 'off',
        'no-constant-condition': 'off',
        'no-param-reassign': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'import/no-unresolved': 'off',
        'consistent-return': 'off',
        'no-restricted-globals': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/indent': 'off',
        'react/jsx-filename-extension': 'off',
        'no-restricted-syntax': 'off'
    },
};
