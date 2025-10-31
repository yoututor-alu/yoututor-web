const isDevelopment = import.meta.env.DEV;

const isStaging =
  isDevelopment || import.meta.env.VITE_ENVIRONMENT === "staging";

const isProduction =
  !isStaging && import.meta.env.VITE_ENVIRONMENT === "production";

export const config = {
  isStaging,
  isProduction,
  isDevelopment,
  //   colors: {
  //     primary: "",
  //   },
  google: {
    clientId: "",
    analyticsId: "",
  },
  keys: {
    access: "YOUTUTOR__ACCESS__TOKEN",
  },
  baseURL: import.meta.env.VITE_API_URL,
};
