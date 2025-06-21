import path from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Inspect from 'vite-plugin-inspect';
import tsconfigPaths from 'vite-tsconfig-paths';
import loadEnv from './loadEnv';

export default defineConfig(({ mode }) => {
  // Load the appropriate .env file based on the mode
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      tsconfigPaths(),
      Inspect(),
      checker({
        typescript: true,
      }),
    ],
    define: {
      // Use the environment variables loaded from the appropriate .env file
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Make sure this points to src
        routes: path.resolve(__dirname, 'src/routes'),
        assets: path.resolve(__dirname, 'src/assets'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        models: path.resolve(__dirname, 'src/models'),
        components: path.resolve(__dirname, 'src/components'),
        containers: path.resolve(__dirname, 'src/containers'),
        styles: path.resolve(__dirname, 'src/styles'),
        theme: path.resolve(__dirname, 'src/styles/theme'),
        services: path.resolve(__dirname, 'src/services'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
  };
});
