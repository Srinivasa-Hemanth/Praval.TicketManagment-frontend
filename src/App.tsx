import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MyRequests from './Components/MyRequests/MyRequests';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import './App.css';
import Header from './Components/Header/Header';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AddRequest from './Components/Forms/AddRequest';
import { IFormState } from './Interfaces/IForm';
import RequestDevice from './Components/Forms/RequestDevice';
import Approval from './Components/ApprovalPage/Approval';
import SignInPage from './Components/SignInPage/SignInPage';

interface IAppProps {}
interface IAppState {
  isAuthenticated: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  handleSignIn = (email: string, password: string) => {
    if (email.toLowerCase() === 'hemanth@gmail.com' && password.toLowerCase() === 'password') {
      this.setState({ isAuthenticated: true });
    }
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div>
          {isAuthenticated ? (
            <>
              <Header />
              <Switch>
                <Route path="/" exact render={(props) => <Home />} />
                <Route path="/dashboard" exact render={(props) => <Dashboard cardClicked={''} openForm={false} />} />
                <Route path="/my-requests" exact render={(props) => <MyRequests />} />
                <Route path="/approvals" exact render={(props) => <Approval />} />
                <Route path="/profile" exact render={(props) => <div>Profile</div>} />
                <Route path="/ITsupport" exact render={(props) => <Dashboard cardClicked={'IT Support'} openForm={true} />} />
                <Route path="/Facilities" exact render={(props) => <Dashboard cardClicked={'Facilities'} openForm={true} />} />
                <Redirect to="/" />
              </Switch>
            </>
          ) : (
            <SignInPage onSignIn={this.handleSignIn} />
          )}
        </div>
      </Router>
    );
  }
}

export default App;
