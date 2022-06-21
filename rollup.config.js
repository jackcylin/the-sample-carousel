/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import babel from '@rollup/plugin-babel';
import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import eslint from "@rollup/plugin-eslint";
import replace from '@rollup/plugin-replace';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/sample-carousel.ts',
  output: {
    name: 'bundle',
    file: 'build/bundle.js',
    format: 'iife',
    // format: 'cjs'
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    minifyHTML(),
    replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
    typescript(),
    resolve(),
    eslint(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    babel({
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled',
    }),
    summary(),
  ],
};
