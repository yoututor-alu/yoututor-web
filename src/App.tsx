import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

const router = createRouter({ routeTree, defaultViewTransition: true });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <Toaster
            position="top-center"
            toastOptions={{
              // Global toast notification styling and behavior configuration
              // These settings ensure consistent notification appearance across the app
              className: "",
              duration: 3_000, // Default 3 second display duration
              style: {
                background: "#333333",
                color: "#eceae5",
                fontSize: "14px",
                fontWeight: "500",
                padding: "7px",
                borderRadius: "12px",
                backdropFilter: "blur(5px)",
                border: "0px solid #32323200"
              },
              // Success notification styling with green accent
              success: {
                style: {
                  padding: "7px 7px 7px 12px"
                },
                iconTheme: {
                  primary: "#3b883e", // Green color for success icon
                  secondary: "#fff"
                }
              },
              // Error notification styling with red accent and longer duration
              error: {
                duration: 10_000, // Longer duration for error messages
                style: {
                  padding: "7px 7px 7px 12px"
                },
                iconTheme: {
                  primary: "#f77069", // Red color for error icon
                  secondary: "#333"
                }
              }
            }}
          />
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ApolloProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
