import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import Header from './components/Header';
import Login from './components/Login';
import RaceHorses from './components/RaceHorses';
import Races from './components/Races';
import Profile from './components/Profile';
import './App.css';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: process.env.REACT_APP_AZURE_AUTHORITY,
    redirectUri: window.location.origin,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <div className="App">
          <Header />
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <Switch>
              <Route path="/horses" component={RaceHorses} />
              <Route path="/races" component={Races} />
              <Route path="/profile" component={Profile} />
              <Redirect from="/" to="/horses" />
            </Switch>
          </AuthenticatedTemplate>
        </div>
      </Router>
    </MsalProvider>
  );
}

export default App;