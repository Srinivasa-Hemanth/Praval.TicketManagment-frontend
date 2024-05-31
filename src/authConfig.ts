import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    // clientId: "538b7e2f-b19c-4d3a-b4ca-1ec5f50cdbde",
    // authority: "https://login.microsoftonline.com/common",
    clientId: 'be21cd27-7648-4808-bf47-7ae85504d26c',
    authority:"https://login.microsoft.com/648ca8d9-38e9-44ca-bc27-20e5a79ee859",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
    scopes: ["User.Read", "Mail.Send"]
};

export const msalInstance = new PublicClientApplication(msalConfig);
