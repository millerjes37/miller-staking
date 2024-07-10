export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_AD_B2C_CLIENT_ID,
      authority: process.env.REACT_APP_AZURE_AD_B2C_AUTHORITY,
      redirectUri: process.env.REACT_APP_AZURE_AD_B2C_REDIRECT_URI,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ['openid', 'profile', 'User.Read'],
  };
  