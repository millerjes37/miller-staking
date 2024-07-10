import { msalConfig, loginRequest } from './authConfig';
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication(msalConfig);

export const login = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    return loginResponse.account;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = () => {
  msalInstance.logoutPopup();
};

export const getAccount = () => {
  const currentAccounts = msalInstance.getAllAccounts();
  if (currentAccounts.length === 0) {
    return null;
  }
  return currentAccounts[0];
};
