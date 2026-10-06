import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://healthycow98.github.io',
  output: 'static',
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
