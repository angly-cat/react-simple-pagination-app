import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from './inputs/TextInput';
import { login } from '../api/index';
import blueLoader from '../images/blue-loader.gif';
import { addFlashMessage, signInUser } from '../store/actions/creators';

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

      this.props.addFlashMessage({
        text: 'Signed in successfully!',
        type: 'success',
        topic: 'userSigning'
      });

      this.props.signInUser(user);

      this.props.history.push(nextRoute);
    })
    .catch((error) => {
      this.props.addFlashMessage({
        text: error,
        type: 'danger',
        topic: 'invalidCredentials'
      });

      this.setState({
        isBusy: false
      });
    });
  };

  componentWillMount() {
    if (this.props.user) {
      this.props.addFlashMessage({
        text: 'User is already signed in!',
        type: 'info',
        topic: 'userSigning'
      });

      this.props.history.push('/list/1');
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

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (user) => dispatch(signInUser(user)),
    addFlashMessage: (id) => dispatch(addFlashMessage(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
