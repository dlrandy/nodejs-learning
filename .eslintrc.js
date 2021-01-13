module.exports = {
    env: {
        browser: true,
        // es2021: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier', 'react'],
    rules: {
        'prettier/prettier': ['error'],
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'no-param-reassign': 0,
        'import/prefer-default-export': 0,
    },
};
