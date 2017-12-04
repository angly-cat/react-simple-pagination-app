import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ContentWithFlashMessages extends Component {
  state = {
    messages: [],
    lastMessageId: -1
  };

  constructor() {
    super();

    this.flash = this.flash.bind(this);
  }

  getChildContext() {
    return {
      flash: this.flash
    };
  }

  flash(newMessage) {
    this.setState((prevState) => {
      return {
        messages: [
          ...prevState.messages.filter((message) => {
            return newMessage.topic ? message.topic !== newMessage.topic : true;
          }),
          {
            ...newMessage,
            id: prevState.lastMessageId + 1
          }
        ],
        lastMessageId: prevState.lastMessageId + 1
      };
    });
  }

  closeMessage = ({ target }) => {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.filter((message) => message.id !== +target.dataset.id)
      };
    });
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen((entry) => {
      this.setState((prevState) => {
        return {
          messages: prevState.messages.filter((message) => entry.pathname.match(message.actualOnPattern))
        };
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <main className='container'>
        <div>
          {this.state.messages.map((message, index) =>
            <div key={message.id} className={`alert alert-${message.type} alert-dismissible fade show`}>
              {message.text}
              <button type='button' className='close' data-id={message.id} onClick={this.closeMessage}>
                <span>&times;</span>
              </button>
            </div>)}
        </div>
        {this.props.children}
      </main>
    );
  }
}
ContentWithFlashMessages.childContextTypes = {
  flash: PropTypes.func
};

export default withRouter(ContentWithFlashMessages);
