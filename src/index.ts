import { TransformOptions } from '@babel/core';
import { ITransformRuntimeOptions } from './props';

declare const require: any;
declare const module: any;

export interface PresetReact {
  /**
   * Replace the function used when compiling JSX expressions.
   * `string`, defaults to `React.createElement`.
   */
  pragma?: string;
  /**
   * Replace the component used when compiling JSX fragments.
   * `string`, defaults to `React.Fragment`.
   */
  pragmaFrag?: string;
  /**
   * Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.
   * `boolean`, defaults to `false`.
   */
  useBuiltIns?: boolean;
  /**
   * `boolean`, defaults to `false`.
   * Toggles plugins that aid in development, such as @babel/plugin-transform-react-jsx-self and @babel/plugin-transform-react-jsx-source.
   * This is useful when combined with the [env option](https://babeljs.io/docs/en/next/options#env) configuration or [js config files](https://babeljs.io/docs/en/next/config-files#javascript).
   */
  development?: boolean;
  /**
   * Replace the component used when compiling JSX fragments.
   * `boolean`, defaults to `true`.
   */
  throwIfNamespace?: boolean;
}

/**
 * [`@babel/preset-env`](https://babeljs.io/docs/en/next/babel-preset-env) is a smart preset that allows you to use the latest JavaScript without
 * needing to micromanage which syntax transforms (and optionally,
 * browser polyfills) are needed by your target environment(s).
 * This both makes your life easier and JavaScript bundles smaller!
 */
export interface IOptions {
  /**
   * `@babel/preset-env` Options.
   */
  env?: any;
  presetReact?: boolean | PresetReact;
  /**
   * Describes the environments you support/target for your project.
   * This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query
   */
  targets?: string | Array<string> | {
    esmodules?: boolean;
    node?: string | 'current' | true;
    /**
     * If you want to compile against the [technology preview](https://developer.apple.com/safari/technology-preview/) version of Safari, you can specify "safari": "tp".
     */
    safari?: string | 'tp';
    /**
     * A query to select browsers (ex: last 2 versions, > 5%, safari tp) using browserslist.  
     * - Note, browsers' results are overridden by explicit items from targets.  
     * - Note: this will be removed in later version in favor of just setting "targets" to a query directly.  
     */
    browsers?: string | Array<string>;
    [key: string]: any;
  };
  /**
   * Enable more spec compliant, but potentially slower, transformations for any plugins in this preset that support them.
   */
  spec?: boolean;
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
  useBuiltIns?: 'usage' | 'entry' | false;
  /**
   * Enable ["loose" transformations](http://2ality.com/2015/12/babel6-loose-mode.html) for any plugins in this preset that allow them.
   */
  loose?: boolean;
  /**
   * Outputs the targets/plugins used and the version specified in [plugin data version](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json) to console.log.
   */
  debug?: boolean;
  corejs?: 2 | 3 | {
    version?: 2 | 3;
    proposals?: boolean;
  };
  forceAllTransforms?: boolean;
  /**
   * The starting point where the config search for browserslist will start, and ascend to the system root until found.
   * defaults to `process.cwd()`
   */
  configPath?: string;
  /**
   * Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used,
   * which includes searching for any browserslist files or referencing the browserslist key inside package.json.
   * This is useful for projects that use a browserslist config for files that won't be compiled with Babel.
   */
  ignoreBrowserslistConfig?: boolean;
  /**
   * Toggles enabling support for builtin/feature proposals that have shipped in browsers.
   * If your target environments have native support for a feature proposal,
   * its matching parser syntax plugin is enabled instead of performing any transform.
   * Note that this does not enable the same transformations as [@babel/preset-stage-3](https://babeljs.io/docs/en/next/babel-preset-stage-3),
   * since proposals can continue to change before landing in browsers.
   */
  shippedProposals?: boolean;
  /**
   * Enable transformation of ES6 module syntax to another module type.  
   * Setting this to false will not transform modules.  
   * Also note that cjs is just an alias for commonjs.  
   */
  modules?: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
  transformRuntime?: ITransformRuntimeOptions | boolean;
  /**
   * Is TypeScript Enabled
   * default `true`
   */
  typescript?: boolean;
}

export default function(context: any, options: IOptions, env: string): TransformOptions {
  const { typescript = true, targets, presetReact, loose = false, modules = 'auto', useBuiltIns = false, transformRuntime } = options;
  const isTypeScriptEnabled = typescript;

  const conf: TransformOptions = {
    presets: [
      [require.resolve('@babel/preset-env'), {
        targets, loose, modules, useBuiltIns,
        ...options.env,
      }],
      isTypeScriptEnabled && [require.resolve('@babel/preset-typescript')],
    ].filter(Boolean),
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),

      // Turn on legacy decorators for TypeScript files
      isTypeScriptEnabled && [
        require.resolve('@babel/plugin-proposal-decorators'),
        { "legacy": true },
      ],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],

      require.resolve('@babel/plugin-transform-async-to-generator'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('babel-plugin-add-module-exports'),
      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      transformRuntime && [
        require.resolve('@babel/plugin-transform-runtime'), transformRuntime
      ],
    ].filter(Boolean),
  }

  if (presetReact && presetReact !== true) {
    conf.presets.push([require.resolve('@babel/preset-react'), presetReact]);
  } else if (presetReact) {
    conf.presets.push(require.resolve('@babel/preset-react'));
  }

  return conf;
}
