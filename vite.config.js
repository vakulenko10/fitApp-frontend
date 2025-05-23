import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@components': path.resolve(__dirname, 'src/components  ')
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/src/setupTests.js',
  }
});