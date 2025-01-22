import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
  },
  build: {
    outDir: "dist",
  },
  publicDir: "public",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  // Use environment variable for base URL, default to root
  // eslint-disable-next-line no-undef
  base: process.env.VITE_BASE_URL || "/",
});
