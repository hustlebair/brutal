import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // used to generate images
  site:
    process.env.VERCEL_ENV === 'production'
      ? 'https://www.highestliked.com/'
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/`
      : 'https://localhost:3000/',
  output: 'server', // Enable server mode for API routes
  adapter: vercel(), // Use Vercel adapter for serverless functions
  trailingSlash: 'ignore',
  integrations: [react(), sitemap(), UnoCSS({ injectReset: true })],
  vite: {
    resolve: {
      alias: {
        '@components': resolve(root, 'src/components'),
        '@layouts': resolve(root, 'src/layouts'),
        '@pages': resolve(root, 'src/pages'),
        '@data': resolve(root, 'src/data'),
        '@utils': resolve(root, 'src/utils'),
      },
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
