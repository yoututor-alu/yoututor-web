import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark", // Default to dark mode
  useSystemColorMode: true, // Respect system preference
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "var(--body_bg)",
        color: "var(--text_color)",
      },
    },
  },
  fonts: {
    body: "Nunito Sans, sans-serif",
    heading: "Nunito Sans, sans-serif",
  },
});
