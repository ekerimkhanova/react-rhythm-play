/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import sass from 'sass';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-rhythm-play",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },

  plugins: [react(), dts(), libInjectCss()],

	test: {
		include: ['src/tests/**'],
		reporters: 'verbose',
    environment: 'jsdom',
    globals: true
	},
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
