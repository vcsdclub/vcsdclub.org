import path from "path";
import { fileURLToPath } from "url";

import { defineConfig, sharpImageService } from "astro/config";

import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import compress from "astro-compress";

import astrowind from "./vendor/integration";

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from "./src/utils/frontmatter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items = []) =>
  hasExternalScripts
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  output: "static",
  compressHTML: true,
  site: "https://vcsdclub.org",

  integrations: [
    sitemap({
  serialize(item) {
    return item;
  },
}),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
        "flat-color-icons": ["*"],
        logos: ["discord-icon", "github-icon", "instagram-icon"],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ["dataLayer.push"] },
      }),
    ),

    compress({
      CSS: true,
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: "./src/config.yaml",
    }),
  ],

  image: {
    service: sharpImageService(),
    domains: ["cdn.pixabay.com"],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
    }),
  },

  vite: {
    css: {
      postcss: { plugins: [tailwind(), autoprefixer()] },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
