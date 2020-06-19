import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'UiCore',
  globalStyle: 'src/global/_global.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme',
      dir: './docs',
      strict: true
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'docs-json',
      file: './docs/core.json'
    },
    {
      type: 'dist-hydrate-script'
    },
  ],
  copy: [{ src: 'global' }],
  plugins: [sass()]
};
