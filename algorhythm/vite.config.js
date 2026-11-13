import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // MyArray.js lives in ../MyArray, outside this project's root
    fs: { allow: [".."] },
  },
});
