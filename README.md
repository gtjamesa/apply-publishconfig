# apply-publishconfig

[![NPM version](https://img.shields.io/npm/v/apply-publishconfig.svg?style=flat)](https://npmjs.org/package/apply-publishconfig)
[![NPM downloads](https://img.shields.io/npm/dm/apply-publishconfig.svg?style=flat)](https://npmjs.org/package/apply-publishconfig)
![Release Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/gtjamesa/apply-publishconfig/release.yml)
![Tests Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/gtjamesa/apply-publishconfig/tests.yml?label=tests)

> Quickly apply a publishConfig into a dependency package.json for deployment

## Overview

This package will apply a [`publishConfig`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#publishconfig) in-place to a project. I have thrown this solution together to build Node server applications with Turborepo [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages), whilst maintaining the full local development experience. I found a [PR](https://github.com/pnpm/pnpm/pull/6943) that suggests that this feature is implemented into [`pnpm deploy`](https://pnpm.io/cli/deploy), but it wasn't working on my end. _This was built with Turborepo in mind, but there's no reason why it cannot also be used in other contexts._

Related discussions:

- https://github.com/vercel/turbo/discussions/4509
- https://github.com/vercel/turbo/discussions/6751

Running the script will edit the internal package's `package.json` in-place and will apply the `publishConfig`. Supported fields include `main` and `exports`

```diff
diff --git a/package.json b/package.json
index f3df0d5..a49f857 100644
--- a/package.json
+++ b/package.json
@@ -3,7 +3,7 @@
   "version": "1.0.0",
-  "main": "./src/index.ts",
+  "main": "./dist/index.js",
   "types": "./src/index.ts",
   "scripts": {
     "build": "tsup src/index.ts",
@@ -16,9 +16,6 @@
-  "publishConfig": {
-    "main": "./dist/index.js"
-  },
```

## Usage

Install the package using your package manager:

```bash
$ pnpm add -D apply-publishconfig
```

Add a script to your internal package's `package.json` with a `publishConfig`:

```json
"main": "./src/index.ts",
"types": "./src/index.ts",
"scripts": {
  "publish:apply": "apply-publishconfig"
},
"publishConfig": {
  "main": "./dist/index.js"
},
```

Add a pipeline to your root `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "publish:apply": {
      "cache": false
    }
  }
}
```

Now when building your app, you can execute the `publish:apply` pipeline:

```bash
$ turbo run publish:apply
```

### Docker example

```dockerfile
...

RUN --mount=type=bind,source=.git,target=.git \
    turbo run build -F "${WORKSPACE}"... \
    && turbo run publish:apply -F "${WORKSPACE}"...

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm deploy -F "${WORKSPACE}" --prod deployed

...
```
