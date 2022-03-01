import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import '../styles/login.css';
import '../styles/loadingLogin.css';
import { createUser } from '../services/userAPI';
import SpotifyLogo from '../images/spotify-logo-login-color.svg';
import LoadingLogin from '../components/LoadingLogin';

class Login extends Component {
  constructor() {
    super();

    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      inputLogin: '',
      inputLength: 0,
      isSubmitBttIsDisabled: true,
      isLoading: true,
      authorized: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleChanges({ target: { name, value } }) {
    const THREE = 3;

    this.setState({
      inputLength: value.length,
      [name]: value,
    }, () => {
      const { inputLength } = this.state;
      const newLoginVerification = inputLength >= THREE;

      this.setState({
        isSubmitBttIsDisabled: !newLoginVerification,
      });
    });
  }

  render() {
    const { inputLogin, isSubmitBttIsDisabled, isLoading, authorized } = this.state;

    return (
      isLoading
        ? (
          <div>
            <LoadingLogin />
          </div>
        )
        : (
          <div>
            <div className="page-login" data-testid="page-login">
              <div className="login-logo-title">
                <img src={ SpotifyLogo } alt="Spotify Logo" />
                <h2 className="header-collab">X</h2>
                <h1 className="login-name">neur4l</h1>
              </div>
              <br />
              <form action="" className="login-inputs">
                <Input
                  id="inputLogin"
                  className="inputLogin"
                  data-testid="login-name-input"
                  name="inputLogin"
                  onChange={ this.handleChanges }
                  placeholder="Insira seu nome..."
                  type="text"
                  value={ inputLogin }
                />

                {
                  isSubmitBttIsDisabled
                    ? (
                      <Input
                        id="loginSubmitButton"
                        className="loginSubmitButton loginSubmitButtonDisabled"
                        data-testid="login-submit-button"
                        disabled={ isSubmitBttIsDisabled }
                        name="loginSubmitButton"
                        type="submit"
                        value="Entrar"
                      />
                    )
                    : (
                      <Input
                        id="loginSubmitButton"
                        className="loginSubmitButton loginSubmitButtonEnabled"
                        data-testid="login-submit-button"
                        disabled={ isSubmitBttIsDisabled }
                        name="loginSubmitButton"
                        type="submit"
                        value="Entrar"
                        onClick={ async (e) => {
                          e.preventDefault();
                          this.setState({ isLoading: true });
                          await createUser({ name: inputLogin });
                          this.setState({ isLoading: false, authorized: true });
                        } }
                      />
                    )
                }

                {
                  authorized && <Redirect to="/search" />
                }
              </form>
            </div>
          </div>
        )
    );
  }
}

export default Login;
