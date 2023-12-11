import type {PackageJson} from './types';
import {applyConfig} from './apply-config';

it('should apply main', () => {
  const packageJson: PackageJson = {
    name: 'my-pkg',
    version: '1.0.0',
    main: './src/index.ts',
    publishConfig: {
      main: './dist/index.js',
    },
  };

  const expected: PackageJson = {
    name: 'my-pkg',
    version: '1.0.0',
    main: './dist/index.js',
  };

  expect(applyConfig(packageJson)).toEqual(expected);
});

it('should apply exports', () => {
  const packageJson: PackageJson = {
    name: 'my-pkg',
    version: '1.0.0',
    main: './src/index.ts',
    publishConfig: {
      exports: {
        '.': './dist/index.js',
        './package.json': './package.json',
        './dist/index.js': './dist/index.js',
        './src/index.ts': './src/index.ts',
      },
    },
  };

  const expected: PackageJson = {
    name: 'my-pkg',
    version: '1.0.0',
    main: './src/index.ts',
    exports: {
      '.': './dist/index.js',
      './package.json': './package.json',
      './dist/index.js': './dist/index.js',
      './src/index.ts': './src/index.ts',
    },
  };

  expect(applyConfig(packageJson)).toEqual(expected);
});

it('should apply multiple fields', () => {
  const packageJson: PackageJson = {
    name: 'my-pkg',
    version: '1.0.0',
    main: './src/index.ts',
    publishConfig: {
      main: './dist/index.js',
      version: '2.0.0',
      license: 'MIT',
    },
  };

  const expected: PackageJson = {
    name: 'my-pkg',
    version: '2.0.0',
    main: './dist/index.js',
    license: 'MIT',
  };

  expect(applyConfig(packageJson)).toEqual(expected);
});
