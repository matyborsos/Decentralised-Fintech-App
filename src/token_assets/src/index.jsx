import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => { 
  
  const authClient = await AuthClient.create();

  if ( await authClient.isAuthenticated()){
    handleAuthenticate(authClient);
  }
  else {
    await authClient.login({
      identityprovider: "https://identity.ic8.app/#authorize",
      onSuccess: () => {
        handleAuthenticate(authClient)
      }
    });
  }
}

async function handleAuthenticate(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  ReactDOM.render(<App loggedInPrincipal = {userPrincipal}/>, document.getElementById("root"));
} 

init();


