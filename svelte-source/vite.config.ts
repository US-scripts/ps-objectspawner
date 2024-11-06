import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import WindiCSS from 'vite-plugin-windicss'
import { minify } from "html-minifier";

const minifyHtml = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return minify(html, {
        collapseWhitespace: true,
      });
    },
  };
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [WindiCSS(), svelte(),
      isProduction && minifyHtml(),
      // isProduction && viteCompression({algorithm: "brotliCompress", ext:".bz"})
    ],
    base: './', // fivem nui needs to have local dir reference
    build: {
      minify: isProduction,
      emptyOutDir: true,
      outDir: '../html',
      assetsDir: './',
      rollupOptions: {
        output: {
          // By not having hashes in the name, you don't have to update the manifest, yay!
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    },
  };
});
