import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        selectLap: resolve(__dirname, "src/selectLap/laps.ts"),
        selectRace: resolve(__dirname, "src/selectRace/races.ts"),
      },
    },
  },
  server: {
    open: "index.html",
  },
});
