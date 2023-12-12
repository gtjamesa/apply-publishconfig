import type {PackageJson} from './types';

/**
 * Apply `publishConfig` modifications to `package.json`
 *
 * @param packageJson
 */
export function applyConfig(packageJson: PackageJson): PackageJson {
  const {publishConfig} = packageJson;

  if (!publishConfig) {
    return packageJson;
  }

  const props = Object.entries(publishConfig);
  for (const [key, value] of props) {
    // We want to assign anything here
    packageJson[key] = value;
  }

  // Remove publishConfig from package.json after we have applied it
  delete packageJson.publishConfig;

  return packageJson;
}
