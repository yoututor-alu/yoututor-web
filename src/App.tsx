import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { checkApiHealth } from "./utilities/health-check";
import ApiWakeUpModal from "./components/ApiWakeUpModal";
import "./App.css";

const router = createRouter({ routeTree, defaultViewTransition: true });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [showWakeUpModal, setShowWakeUpModal] = useState(false);

  useEffect(() => {
    let showModalTimeout: NodeJS.Timeout;
    let checkInterval: NodeJS.Timeout;
    let isMounted = true;
    let apiIsHealthy = false;

    const performHealthCheck = async () => {
      const isHealthy = await checkApiHealth();

      if (!isMounted) return;

      apiIsHealthy = isHealthy;

      if (isHealthy) {
        // API is up, clear any pending modal timeout and hide modal
        if (showModalTimeout) {
          clearTimeout(showModalTimeout);
        }
        if (checkInterval) {
          clearInterval(checkInterval);
        }
        setShowWakeUpModal(false);
      }
    };

    // Start initial health check
    const startTime = Date.now();

    // Set a timeout to show modal after 2 seconds if health check hasn't succeeded
    showModalTimeout = setTimeout(() => {
      if (!isMounted || apiIsHealthy) return;
      setShowWakeUpModal(true);
      // Start polling every 2 seconds until API is up
      checkInterval = setInterval(performHealthCheck, 2000);
    }, 2000);

    // Perform initial health check
    performHealthCheck().then(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;

      // If health check succeeded quickly (< 2 seconds), cancel the modal timeout
      if (apiIsHealthy && elapsed < 2000) {
        clearTimeout(showModalTimeout);
      } else if (!apiIsHealthy && elapsed >= 2000) {
        // If it took longer and API is not healthy, show modal and start polling
        if (!checkInterval) {
          setShowWakeUpModal(true);
          checkInterval = setInterval(performHealthCheck, 2000);
        }
      }
    });

    return () => {
      isMounted = false;
      if (showModalTimeout) {
        clearTimeout(showModalTimeout);
      }
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

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
            <ApiWakeUpModal isOpen={showWakeUpModal} />
            <RouterProvider router={router} />
          </ChakraProvider>
        </ApolloProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
