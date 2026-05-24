import wordpress from '@wordpress/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
	...wordpress.configs['recommended-with-formatting'],
	prettier,
	{
		rules: {
			// @wordpress/* packages are WordPress runtime externals (window.wp.*),
			// not installed in node_modules, so skip resolution checks for them.
			'import/no-unresolved': ['error', { ignore: ['^@wordpress/'] }],
		},
	},
];
