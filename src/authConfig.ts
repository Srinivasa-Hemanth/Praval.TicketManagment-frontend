import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "538b7e2f-b19c-4d3a-b4ca-1ec5f50cdbde", 
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
