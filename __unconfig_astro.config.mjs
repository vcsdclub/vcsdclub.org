
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import path from "path";
import { fileURLToPath } from "url";

import { defineConfig, squooshImageService } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
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

const __unconfig_default =  defineConfig({
  output: "static",

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
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
      })
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
    service: squooshImageService(),
    domains: ["cdn.pixabay.com"],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});

if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;