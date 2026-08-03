import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://amorworks.github.io",
  base: "/sawada-tomu-group-site",
  trailingSlash: "never",
  build: {
    format: "file"
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !page.endsWith("/index.html"),
      serialize: (() => {
        const seen = new Set();

        return (item) => {
          const url = item.url.replace(/\/$/, "");
          if (seen.has(url)) return undefined;

          seen.add(url);
          return { ...item, url };
        };
      })()
    })
  ],
  vite: {
    build: {
      cssMinify: "lightningcss"
    }
  }
});
