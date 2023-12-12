#!/usr/bin/env node
import fs from 'node:fs/promises';
import process from 'node:process';
import {log} from './log';
import type {PackageJson} from './types';
import {applyConfig} from './apply-config';
import {isCI} from 'ci-info';
import {Options, options} from './cli';
import {resolvePath} from './path-resolver';

async function main(options: Options) {
  if (options.ci && !isCI) {
    log('Skipping because "--ci" is set and not in a CI environment');
    return;
  }

  const packagePath = resolvePath(options.path);
  const packageJson: PackageJson = await readPackageJson(packagePath);

  const {name, version, publishConfig} = packageJson;

  // TODO: Add CLI options to disable logging.
  log(`Processing ${name}@${version}`);

  if (!publishConfig) {
    log('No publishConfig found in package.json');
    return;
  }

  log('Applying publishConfig to package.json');
  const modifiedPackageJson = applyConfig(packageJson);

  if (options.dryRun) {
    console.log(modifiedPackageJson);
  } else {
    await fs.writeFile(
      packagePath,
      JSON.stringify(modifiedPackageJson, null, 2),
    );
  }
}

async function readPackageJson(packagePath: string): Promise<PackageJson> {
  const file = await fs.readFile(packagePath, 'utf-8');
  return JSON.parse(file) as PackageJson;
}

main(options).catch(err => {
  console.error(err);
  process.exit(1);
});
