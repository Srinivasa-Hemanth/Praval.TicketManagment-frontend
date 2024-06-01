import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import home_icon from '../../Assets/Images/house-door-fill.svg';
import dashboard_icon from '../../Assets/Images/speedometer2.svg';
import requests_icon from '../../Assets/Images/file-earmark-text.svg';
import profile_icon from '../../Assets/Images/person-fill.svg';
import praval_logo from '../../Assets/Images/Latest-Logo.png';
import './Header.css';
import { AccountInfo } from '@azure/msal-browser';
import { Role } from '../../Common/Enum';

interface IHeaderState {
  isManager: boolean;
  dropdownOpen: boolean;
}

interface IHeaderProps {
  SignIn: () => void;
  SignOut: () => void;
  userName: string;
  account: AccountInfo;
  role:string
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      isManager: true,
      dropdownOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { isManager, dropdownOpen } = this.state;
    const {role}=this.props;
    return (
      <header className='d-flex align-items-center justify-content-between p-3'>
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
            {/* <li className="nav-link">
              <Link to="/my-requests" className="text-decoration-none text-white">
                <img src={requests_icon} alt="Requests" /> My Requests
              </Link>
            </li>
            { role==Role.Manager || role==Role.IT_Admin && (
              <li className="nav-link">
                <Link to="/approvals" className="text-decoration-none text-white">
                  <img src={requests_icon} alt="Approvals" /> Approvals
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="d-flex text-white align me-4 profile-info pe-5">
          <li className="nav-link dropdown">
            <div
              onClick={this.toggleDropdown}
              className="text-decoration-none text-white dropdown-toggle"
              role="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <img src={profile_icon} alt="Profile" /> Welcome {this.props.account?.username ? this.props.account?.name: ''}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={this.props.SignOut}>
                  <span className="icon icon-sign-out"></span> Log out
                </a>
              </div>
            )}
          </li>
        </div>
      </header>
    );
  }
}

export default Header;
