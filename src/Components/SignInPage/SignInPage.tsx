import React from "react";
import img from '../../Assets/Images/flat-design-illustration-customer-support_23-2148887720.avif'
import logo from '../../Assets/Images/Latest-Logo.png';
import './SignInPage.css';

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void;
}

class SignInPage extends React.Component<SignInPageProps> {
  state = {
    email: '',
    password: ''
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSignIn(email, password);
  };

  render() {
    return (
      <div className='d-flex justify-content-around'>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="container mt-5">
          <div className="heading">Sign In</div>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              onChange={this.handleChange}
              required
            />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              onChange={this.handleChange}
              required
            />
            <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
            <input value="Sign In" type="submit" className="login-button" />
          </form>
        </div>

        <div className='logo'>
          <img src={img} alt="" />
        </div>
      </div>
    );
  }
}

export default SignInPage;
