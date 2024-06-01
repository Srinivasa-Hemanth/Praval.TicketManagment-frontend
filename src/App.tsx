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
import { GetUserRole } from './Services/UserService';

const App: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [firstName, setFirstName] = useState<any>(null);
  const [authChanged, setAuthChanged] = useState<boolean>(false);
  const [Role,setRole]=useState<any>(null);

  useEffect(() => {
    const loginAndSetName = async () => {
      try {
        console.log(accounts)
        if (accounts.length === 0) {
          await msalInstance.initialize()
          await msalInstance.loginRedirect();
        } else {
          const account: AccountInfo = accounts[0];
          console.log(account)
          const idTokenClaims = account.idTokenClaims;
          console.log(idTokenClaims);
          if (idTokenClaims) {
            const name = idTokenClaims.name || 'User';
            setFirstName(name);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loginAndSetName();
  }, [ instance, accounts ]);

  useEffect(()=>{
    if(accounts.length!=0)
    { 
      var role=GetUserRole(accounts[0]?.username)
      setRole(role)
    }
  },[])


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
          <Header SignIn={handleLogin} SignOut={handleLogout} userName={firstName} account={accounts[0]} role={Role}/>
        </div>
        <div>
          <Switch>
            <Route path="/" exact render={(props) => <Home />} />
            <Route path="/dashboard" exact render={(props) => <Dashboard cardClicked={''} openForm={false} account={accounts[0]}/>} />
            <Route path="/my-requests" exact render={(props) => <MyRequests />} />
            <Route path="/approvals" exact render={(props) => <Approval />} />
            <Route path="/profile" exact render={(props) => <div>Profile</div>} />
            <Route path="/ITsupport" exact render={(props) => <Dashboard cardClicked={'IT Support'} openForm={true} account={accounts[0]}/>} />
            <Route path="/Facilities" exact render={(props) => <Dashboard cardClicked={'Facilities'} openForm={true} account={accounts[0]}/>} />
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
