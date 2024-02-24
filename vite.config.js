import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        selectLap: resolve(__dirname, "src/selectLap/laps.js"),
        selectRace: resolve(__dirname, "src/selectRace/races.js"),
      },
    },
  },
  server: {
    open: "index.html",
  },
});
