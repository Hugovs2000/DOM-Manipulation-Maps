import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        selectLap: resolve(__dirname, "src/selectLap/index.html"),
        selectRace: resolve(__dirname, "src/selectRace/index.html"),
      },
    },
  },
  server: {
    open: "index.html",
  },
});
