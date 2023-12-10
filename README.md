# apply-publishconfig

[![NPM version](https://img.shields.io/npm/v/apply-publishconfig.svg?style=flat)](https://npmjs.org/package/apply-publishconfig)
[![NPM downloads](https://img.shields.io/npm/dm/apply-publishconfig.svg?style=flat)](https://npmjs.org/package/apply-publishconfig)

> Quickly apply a publishConfig into a dependency package.json for deployment

After struggling building a Node.js app with Turborepo [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages), I decided to hack together a solution that will apply a package's [`publishConfig`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#publishconfig). I found a [PR](https://github.com/pnpm/pnpm/issues/6693) that suggests that this feature is implemented into [`pnpm deploy`](https://pnpm.io/cli/deploy), but it wasn't working on my end.

I have built this with Turborepo in mind, but there's no reason why it cannot also be used in other contexts.

Related discussions:

- https://github.com/vercel/turbo/discussions/4509
- https://github.com/vercel/turbo/discussions/6751

## Usage

Install the package using your package manager:

```bash
$ pnpm add -D apply-publishconfig
```

Add a script to your dependency's `package.json` with a `publishConfig`:

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
    ...
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
