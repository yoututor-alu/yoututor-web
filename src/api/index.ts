import { config } from "../config";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import Cookies from "js-cookie";

export const getUpdatedToken = (): string => {
  // Return empty string during server-side rendering
  if (typeof window === "undefined") {
    return "";
  }

  // Return empty string if no cookies available
  if (!window?.document?.cookie) {
    return "";
  }

  // Extract access token from cookies, fallback to empty string
  return Cookies.get(config.keys.access) || "";
};

const authLink = new ApolloLink((operation, forward) => {
  const token = getUpdatedToken();

  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  credentials: "include", // Include cookies in requests for session management
  uri: `${config.baseURL}/graphql`, // GraphQL endpoint URL
});

export const client = new ApolloClient({
  credentials: "include", // Include cookies for authentication
  link: authLink.concat(httpLink), // Chain auth and HTTP links
  cache: new InMemoryCache({ addTypename: false }), // Disable __typename field
});
