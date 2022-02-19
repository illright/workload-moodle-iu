import fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const plugins = [
	svelte({
		preprocess: sveltePreprocess({ sourceMap: !production }),
		compilerOptions: {
			dev: !production
		}
	}),
	css({ output: 'bundle.css' }),

	resolve({
		browser: true,
		dedupe: ['svelte']
	}),
	commonjs(),
	typescript({
		sourceMap: !production,
		inlineSources: !production
	}),

	!production && serve(),
	!production && livereload('public'),
	production && terser()
];

const INPUT_DIR = 'src/';
export default fs
	.readdirSync(INPUT_DIR)
	.filter(file => file.endsWith('.entry.ts'))
	.map(file => ({
		input: INPUT_DIR + file,
		output: {
			inlineDynamicImports: true,
			entryFileNames: `${file}.bundle.js`,
			dir: 'public/build',
			format: 'iife',
			name: file,
			sourcemap: false,
		},
		plugins,
		watch: {
			clearScreen: false
		}
	}));
