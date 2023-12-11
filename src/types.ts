export type PackageJson =
  | (WellKnownFields & {
      main?: string;
      exports?: Record<string, string>;
      // Any valid package.json field can be used inside `publishConfig`,
      // and should be applied to the final package.json.
      // https://docs.npmjs.com/cli/v10/using-npm/config#config-settings
      publishConfig?: JsonObject;
    })
  | (JsonObject & WellKnownFields);

export interface WellKnownFields {
  name: string;
  version: string;
}

export type JsonObject = {[key in string]: unknown};
