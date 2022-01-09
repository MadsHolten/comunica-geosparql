import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const extensions = ['.js', '.ts' ];

export default [
  {
    input: 'src/index.ts',
    inlineDynamicImports: true,
    output: [
      {
        file: 'lib/bundles/bundle.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'lib/bundles/bundle.esm.min.js',
        format: 'esm',
        plugins: [terser()],
        sourcemap: true
      },
      {
        file: 'lib/bundles/bundle.umd.js',
        format: 'umd',
        name: 'ifc-lbd',
        sourcemap: true
      },
      {
        file: 'lib/bundles/bundle.umd.min.js',
        format: 'umd',
        name: 'ifc-lbd',
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'})
    ]
  },
  {
    // Add type declarations
    input: './lib/types/index.d.ts',
    output: [
      { file: 'lib/bundles/bundle.esm.d.ts', format: 'es' },
      { file: 'lib/bundles/bundle.esm.min.d.ts', format: 'es' },
      { file: 'lib/bundles/bundle.umd.d.ts', format: 'es' },
      { file: 'lib/bundles/bundle.umd.min.d.ts', format: 'es' }
    ],
    plugins: [dts()],
  }
]