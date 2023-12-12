export interface PackageJson {
  [key: string]: unknown;

  name: string;
  version: string;
  main?: string;
  exports?: Record<string, string>;
  // Any valid package.json field can be used inside `publishConfig`,
  // and should be applied to the final package.json.
  // https://docs.npmjs.com/cli/v10/using-npm/config#config-settings
  publishConfig?: Record<string, any>;
}
