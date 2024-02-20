import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        app: "landing.html",
      },
    },
  },
  server: {
    open: "landing.html",
  },
});
