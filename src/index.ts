#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {log} from './log';
import type {PackageJson} from './types';
import {applyConfig} from './apply-config';

async function main() {
  const baseDir = process.argv.length > 2 ? process.argv[2] : process.cwd();
  const packagePath = path.resolve(baseDir, './package.json');
  const packageJson: PackageJson = await readPackageJson(packagePath);

  const {name, version, publishConfig} = packageJson;

  log(`Processing ${name}@${version}`);

  if (!publishConfig) {
    log('No publishConfig found in package.json');
    return;
  }

  log('Applying publishConfig to package.json');
  const modifiedPackageJson = applyConfig(packageJson);
  await fs.writeFile(packagePath, JSON.stringify(modifiedPackageJson, null, 2));
}

async function readPackageJson(packagePath: string): Promise<PackageJson> {
  const file = await fs.readFile(packagePath, 'utf-8');
  return JSON.parse(file) as PackageJson;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
