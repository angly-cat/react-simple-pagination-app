import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addFlashMessage, signOutUser } from '../store/actions/creators';

class LogoutButton extends Component {
  handleSignOut = () => {
    this.props.addFlashMessage({
      text: 'Signed out successfully!',
      type: 'success',
      topic: 'userSigning'
    });

    this.props.signOutUser();
  };

  render() {
    return (
      <a className='nav-item logout-button' onClick={this.handleSignOut}>
        <span className='nav-link'>Logout</span>
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    addFlashMessage: (id) => dispatch(addFlashMessage(id))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
