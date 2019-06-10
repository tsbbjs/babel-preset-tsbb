import { TransformOptions } from '@babel/core';

declare const require: any;
declare const module: any;

export interface IOptions {
  env: any;
  loose?: boolean;
}

module.exports = (options: IOptions): TransformOptions => {
  const { env = {}, loose = false } = options;
  return {
    presets: [
      [require.resolve('@babel/preset-env'), {
        loose,
        ...env,
      }],
      require.resolve('@babel/preset-typescript')
    ],
    plugins: [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),

      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],

      require.resolve('@babel/plugin-proposal-export-default-from'),
    ],
  };
}
