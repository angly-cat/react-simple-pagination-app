import React, { Component } from 'react';
import TextInput from './inputs/TextInput';
import { login } from '../api/api';
import blueLoader from '../images/blue-loader.gif';
import PropTypes from "prop-types";

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isBusy: false
  };

  updateTextField = ({ target }) => {
    this.setState({
      [target.dataset.field]: target.value
    });
  };

  initiateSigningIn = (e) => {
    e.preventDefault();

    this.setState({
      isBusy: true
    });

    login({
      username: this.state.username,
      password: this.state.password
    })
    .then((user) => {
      this.context.flash({
        text: 'Signed in successfully!',
        type: 'success',
        actualOnPattern: /\/list\/1/
      });

      this.props.history.push('/list/1');
    })
    .catch((error) => {
      this.context.flash({
        text: error,
        type: 'danger',
        topic: 'invalidCredentials',
        actualOnPattern: /\/login/
      });

      this.setState({
        isBusy: false
      });
    });
  };

  render() {
    const { username, password, isBusy } = this.state;
    return (
      <form onSubmit={this.initiateSigningIn}>
        <TextInput
          fieldName='username'
          fieldValue={username}
          updateTextField={this.updateTextField}
          disabled={isBusy}
        />
        <TextInput
          fieldName='password'
          fieldValue={password}
          updateTextField={this.updateTextField}
          disabled={isBusy}
        />
        <button
          type='submit'
          className={`${isBusy ? 'busy ' : ' '}submit-button btn btn-primary`}
          disabled={isBusy}
        >
          Log In
          <img src={blueLoader} alt='Loading Indicator' />
        </button>
      </form>
    );
  }
}
LoginForm.contextTypes = {
  flash: PropTypes.func
};

export default LoginForm;
