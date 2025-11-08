import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#151936"
      }
    }
  },
  fonts: {
    body: "Nunito Sans, sans-serif",
    heading: "Nunito Sans, sans-serif"
  }
});
