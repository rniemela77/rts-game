import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [vue()],
})

// vite.config.js / vite.config.ts
// import VitePluginBrowserSync from 'vite-plugin-browser-sync';

// export default {
//   plugins: [VitePluginBrowserSync()],
// };
