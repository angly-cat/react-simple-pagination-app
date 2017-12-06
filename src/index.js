import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import createStore from './store';
import FlashMessagesProvider from './components/FlashMessagesProvider';
import App from './components/App';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <FlashMessagesProvider>
        <App />
      </FlashMessagesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
