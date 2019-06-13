babel-preset-tsbb
---

![](https://www.travis-ci.org/tsbbjs/babel-preset-tsbb.svg?branch=master)
![](https://img.shields.io/github/issues/tsbbjs/babel-preset-tsbb.svg)
![](https://img.shields.io/github/forks/tsbbjs/babel-preset-tsbb.svg)
![](https://img.shields.io/github/stars/tsbbjs/babel-preset-tsbb.svg)
![](https://img.shields.io/npm/v/@tsbb/babel-preset-tsbb.svg)

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