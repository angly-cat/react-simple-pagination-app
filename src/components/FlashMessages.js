import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFlashMessage } from '../store/actions/creators';

class FlashMessages extends Component {
  handleClosing = ({ target }) => {
    this.props.removeFlashMessage(+target.dataset.id);
  };

  render() {
    return (
      <div>
        {this.props.flashMessages.map((message) =>
          <div key={message.id} className={`alert alert-${message.type} alert-dismissible fade show`}>
            {message.text}
            <button type='button' className='close' data-id={message.id} onClick={this.handleClosing}>
              <span>&times;</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ flashMessages }) => {
  return {
    flashMessages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFlashMessage: (id) => dispatch(removeFlashMessage(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);
