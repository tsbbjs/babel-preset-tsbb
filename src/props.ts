
/**
 * A plugin that enables the re-use of Babel's injected helper code to save on codesize.
 * https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html#options
 */
export interface ITransformRuntime {
  /**
   * https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html#corejs
   * Specifying a number will rewrite the helpers that
   * need polyfillable APIs to reference helpers from that (major) version of core-js
   * instead Please note that `corejs: 2` only supports global variables (e.g. Promise) and
   * static properties (e.g. `Array.from`), while `corejs: 3` also supports instance properties (e.g. [].includes).
   */
  corejs?: 2 | 3 | {
    version?: 2 | 3;
    proposals?: boolean;
  };
  /**
   * defaults to `true`.
   * Toggles whether or not inlined Babel helpers (`classCallCheck`, `extends`, etc.) are replaced with calls to moduleName.
   * For more information, see [Helper aliasing](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html#helper-aliasing).
   */
  helpers?: boolean;
  /**
   * defaults to `true`.
   * Toggles whether or not generator functions are transformed to use a regenerator
   * runtime that does not pollute the global scope.
   * For more information, see [Regenerator aliasing](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html#regenerator-aliasing).
   */
  regenerator?: boolean;
  /**
   * defaults to `false`.
   * When enabled, the transform will use helpers that do not get run through `@babel/plugin-transform-modules-commonjs`.
   * This allows for smaller builds in module systems like webpack,
   * since it doesn't need to preserve commonjs semantics.
   */
  useESModules?: boolean;
  /**
   * defaults to `false`.
   */
  absoluteRuntime?: boolean;
}