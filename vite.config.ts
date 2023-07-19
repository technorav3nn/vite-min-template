import rakkas from "rakkasjs/vite-plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vanillaExtractPlugin({
    // 	identifiers: "debug",
    // }),
    rakkas(),
  ],
  ssr: {
    noExternal: ["@mantine/core", "@mantine/hooks", "@mantine/vanilla-extract"],
  },
});
