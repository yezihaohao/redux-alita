import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'howLongUntilLunch',
			file: pkg.browser,
			format: 'umd',
			globals: {
				'react': 'React',
				'react-redux': 'reactRedux',
				'redux': 'redux',
				'redux-thunk': 'thunk'
			},
		},
		external: [ 'react', 'redux', 'redux-thunk', 'react-redux' ],
		plugins: [
			babel({
				babelrc: false,
				exclude: 'node_modules/**', // 只编译我们的源代码
			}),
			resolve(),
			commonjs({
				include: 'node_modules/**',
			}),
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		external: [ 'react', 'redux', 'redux-thunk', 'react-redux' ],
		plugins: [
			babel({
				babelrc: false,
				exclude: 'node_modules/**', // 只编译我们的源代码
			}),
			resolve(),
		]
	}
];
