import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export default {
  input: './src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/alz-predictor.cjs.js',
      exports: 'auto',
    },
    {
      format: 'esm',
      file: 'dist/alz-predictor.esm.js',
    },
  ],
  plugins: [
    babel(),
    generatePackageJson({
      outputFolder: 'dist',
      baseContents: ({
        scripts,
        dependencies,
        devDependencies,
        jest,
        ...pkg
      }) => ({
        ...pkg,
        main: 'alz-predictor.cjs.js',
        module: 'alz-predictor.esm.js',
      }),
    }),
    copy({
      targets: [{ src: 'README.md', dest: 'dist' }],
    }),
  ],
};
