#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

async function main() {
  const baseDir = process.argv.length > 2 ? process.argv[2] : process.cwd();
  const packagePath = path.resolve(baseDir, './package.json');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packageJson: PackageJson = await fs
    .readFile(packagePath, 'utf-8')
    .then(JSON.parse);

  const {name, version, publishConfig} = packageJson;

  console.log(`Processing ${name}@${version}`);

  if (!publishConfig) {
    console.log('No publishConfig found in package.json');
    return;
  }

  console.log('Applying publishConfig to package.json');

  packageJson.main = publishConfig.main ?? packageJson.main;
  packageJson.exports = publishConfig.exports ?? packageJson.exports;
  delete packageJson.publishConfig;

  // console.log(packageJson);
  await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
}

main().catch(console.error);

interface PackageJson {
  name: string;
  version: string;
  main?: string;
  exports?: Record<string, string>;
  publishConfig?: {
    main?: string;
    exports?: Record<string, string>;
  };
}
