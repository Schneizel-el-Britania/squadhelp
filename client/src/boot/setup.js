import React from 'react';
import { Provider } from 'react-redux';
import { initSocket } from '../api/ws/socketController';
import configureStore from './configureStore';
import App from '../App';

const Setup = () => (
  <Provider store={initSocket(configureStore())}>
    <App />
  </Provider>
);

export default Setup;
