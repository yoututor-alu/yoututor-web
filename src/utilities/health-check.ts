import { config } from "../config";

/**
 * Performs a health check on the API by attempting to connect to the GraphQL endpoint
 * @returns Promise that resolves to true if API is up, false otherwise
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second max timeout

    const response = await fetch(`${config.baseURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "{ __typename }", // Minimal GraphQL query to check if server is up
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    // Network error or timeout - API is likely sleeping
    return false;
  }
};

