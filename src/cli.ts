import {Command} from '@commander-js/extra-typings';
import localPkg from '../package.json';
import process from 'node:process';

export const program = new Command()
  .name(localPkg.name)
  .version(localPkg.version)
  .description(localPkg.description)
  .option('--ci', 'Only apply publishConfig in CI environments', false)
  .option(
    '-n, --dry-run',
    'Dry run, do not write to package.json (implies "--ci")',
    false,
  )
  .option('-q, --quiet', 'Do not perform any logging', false)
  .option('-p, --path <path>', 'Path to package.json', process.cwd());

program.parse();
export const options = program.opts();

export type Options = typeof options;
