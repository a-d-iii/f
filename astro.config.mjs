import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    image(),
    react(),
  ],
});
