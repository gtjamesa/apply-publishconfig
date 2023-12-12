import {resolve} from 'node:path';

/**
 * Resolve a path to package.json
 * @param path
 */
export function resolvePath(path: string): string {
  return path.endsWith('package.json') ? path : resolve(path, './package.json');
}
