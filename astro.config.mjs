import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://amorworks.github.io",
  base: "/sawada-tomu-group-site",
  trailingSlash: "ignore",
  build: {
    format: "file"
  },
  vite: {
    build: {
      cssMinify: "lightningcss"
    }
  }
});
