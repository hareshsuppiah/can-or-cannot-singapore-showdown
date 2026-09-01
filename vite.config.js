import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const githubPagesBase = '/can-or-cannot-singapore-showdown/';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' ? githubPagesBase : '/',
});
