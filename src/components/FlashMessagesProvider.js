import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class FlashMessagesProvider extends Component {
  state = {
    messages: [],
    lastMessageId: -1
  };

  constructor() {
    super();

    this.flash = this.flash.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }

  getChildContext() {
    return {
      flash: this.flash,
      flashMessages: this.state.messages,
      closeFlashMessage: this.closeMessage
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
    return this.props.children;
  }
}
FlashMessagesProvider.childContextTypes = {
  flash: PropTypes.func,
  flashMessages: PropTypes.array,
  closeFlashMessage: PropTypes.func
};

export default withRouter(FlashMessagesProvider);
