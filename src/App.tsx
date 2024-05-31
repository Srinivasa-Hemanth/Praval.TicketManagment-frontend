import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MyRequests from './Components/MyRequests/MyRequests';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import './App.css';
import Header from './Components/Header/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Approval from './Components/ApprovalPage/Approval';
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalInstance } from './authConfig';
import { AccountInfo } from '@azure/msal-browser';
import { sendMail } from './Services/EmailService';
import ITAdmin from './Components/ITAdmin/ITAdmin';

const App: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [firstName, setFirstName] = useState<any>(null);

  useEffect(() => {
    debugger
    if (accounts.length === 0) {
      instance.loginRedirect().catch(e => {
        console.error(e);
      });
    }
    else {
      const account: AccountInfo = accounts[0];
      const idTokenClaims = account.idTokenClaims;
      console.log(idTokenClaims)
      if (idTokenClaims && idTokenClaims.given_name) {
        setFirstName(idTokenClaims.preferred_username);
      }
    }
  }, [accounts, instance]);

  const handleLogin = () => {
    instance.loginRedirect().catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch(e => {
      console.error(e);
    });
  };

  return (
    <Router>
      <div>
        <div>
          <Header SignIn={handleLogin} SignOut={handleLogout} userName={firstName}/>
        </div>
        <div>
          <Switch>
            <Route path="/" exact render={(props) => <Home />} />
            <Route path="/dashboard" exact render={(props) => <Dashboard cardClicked={''} openForm={false} />} />
            <Route path="/my-requests" exact render={(props) => <MyRequests />} />
            <Route path="/approvals" exact render={(props) => <Approval />} />
            <Route path="/profile" exact render={(props) => <div>Profile</div>} />
            <Route path="/ITsupport" exact render={(props) => <Dashboard cardClicked={'IT Support'} openForm={true} />} />
            <Route path="/Facilities" exact render={(props) => <Dashboard cardClicked={'Facilities'} openForm={true} />} />
            <Route path="/Itadmin" exact render={(props)=><ITAdmin/>}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const AppWithMsal: React.FC = () => (
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);

export default AppWithMsal;
