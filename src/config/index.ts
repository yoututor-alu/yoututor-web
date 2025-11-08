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
    clientId:
      "850623390361-vku6t3u5qc95vbi53ktgd6ue9551oucd.apps.googleusercontent.com",
    analyticsId: ""
  },
  keys: {
    access: "YOUTUTOR__ACCESS__TOKEN"
  },
  baseURL: import.meta.env.VITE_API_URL
};
