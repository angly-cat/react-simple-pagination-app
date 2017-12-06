import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  render() {
    return (
      <main className='container'>
        <div>
          {this.context.flashMessages.map((message) =>
            <div key={message.id} className={`alert alert-${message.type} alert-dismissible fade show`}>
              {message.text}
              <button type='button' className='close' data-id={message.id} onClick={this.context.closeFlashMessage}>
                <span>&times;</span>
              </button>
            </div>)}
        </div>
        {this.props.children}
      </main>
    );
  }
}
Content.contextTypes = {
  flashMessages: PropTypes.array,
  closeFlashMessage: PropTypes.func
};

export default Content;
