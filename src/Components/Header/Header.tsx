import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import home_icon from '../../Assets/Images/house-door-fill.svg';
import dashboard_icon from '../../Assets/Images/speedometer2.svg';
import requests_icon from '../../Assets/Images/file-earmark-text.svg';
import profile_icon from '../../Assets/Images/person-fill.svg';
import praval_logo from '../../Assets/Images/Latest-Logo.png';

interface IHeaderState{
    isManager: boolean;
}

interface IHeaderProps{
  SignIn: () => void; 
  SignOut: () => void; 
  userName: string;
}

class Header extends React.Component<IHeaderProps,IHeaderState>{
    constructor(props:IHeaderProps){
        super(props)
        this.state = {
            isManager: true,
        };
    }

    render(){
        const { isManager } = this.state;
        return(
            <header className='d-flex align-items-center justify-content-between bg-dark p-3'>
              <div>
                <img src={praval_logo} width={120} alt="praval_logo" />
              </div>
              <nav className="navbar">
                <ul className="list-unstyled d-flex gap-4 mb-0">
                  <li className="nav-link">
                    <Link to="/" className="text-decoration-none text-white">
                      <img src={home_icon} alt="Home" /> Home
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/dashboard" className="text-decoration-none text-white">
                      <img src={dashboard_icon} alt="Dashboard" /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/my-requests" className="text-decoration-none text-white">
                      <img src={requests_icon} alt="Requests" /> My Requests
                    </Link>
                  </li>
                  {isManager && (
                    <li className="nav-link">
                      <Link to="/approvals" className="text-decoration-none text-white">
                        <img src={requests_icon} alt="Approvals" /> Approvals
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
              <div className="d-flex text-white align me-4 profile-info">
                  <li className="nav-link">
                    <div onClick={this.props.SignIn} className="text-decoration-none text-white">
                      <img src={profile_icon} alt="Profile" /> Welcome,{this.props.userName}
                    </div>
                  </li>
              </div>
          </header>
        );
    }
}

export default Header;