babel-preset-tsbb
---

This package includes the [Babel](https://babeljs.io) preset used by tsbb.

## Install

```bash
npm i babel-preset-tsbb
```

## Usage Outside of tsbb

If you want to use this Babel [preset](https://babeljs.io/docs/en/next/presets) in a project not built with `tsbb`, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

```json
{
  "presets": [
    ["@tsbb/babel-preset-tsbb", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }]
  ]
}
```