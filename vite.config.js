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
      // Expose all environment variables loaded by loadEnv.ts
      ...Object.entries(env).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
      }, {}),
      'process.env.NODE_ENV': JSON.stringify(mode),
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
    build: {
      chunkSizeWarningLimit: 5000, // Increase the warning limit to 1000 kB
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
