import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOutUser } from '../store/actions/creators';

class LogoutButton extends Component {
  handleSignOut = () => {
    this.context.flash({
      text: 'Signed out successfully!',
      type: 'success',
      topic: 'userSigning',
      actualOnPattern: this.props.location.pathname
    });

    this.props.signOutUser();
  };

  render() {
    return (
      <a className='nav-item' onClick={this.handleSignOut}>
        <span className='nav-link'>Logout</span>
      </a>
    );
  }
}
LogoutButton.contextTypes = {
  flash: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
