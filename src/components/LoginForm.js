import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './inputs/TextInput';
import { login } from '../api/index';
import blueLoader from '../images/blue-loader.gif';
import { signInUser } from '../store/actions/creators';

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
      const nextRoute = '/list/1';

      this.context.flash({
        text: 'Signed in successfully!',
        type: 'success',
        topic: 'userSigning',
        actualOnPattern: nextRoute
      });

      this.props.signInUser(user);

      this.props.history.push(nextRoute);
    })
    .catch((error) => {
      this.context.flash({
        text: error,
        type: 'danger',
        topic: 'invalidCredentials',
        actualOnPattern: this.props.location.pathname
      });

      this.setState({
        isBusy: false
      });
    });
  };

  componentWillMount() {
    if (this.props.user) {
      const nextRoute = '/list/1';

      this.context.flash({
        text: 'User is already signed in!',
        type: 'info',
        topic: 'userSigning',
        actualOnPattern: nextRoute
      });

      this.props.history.push(nextRoute);
    }
  }

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

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user) => dispatch(signInUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
