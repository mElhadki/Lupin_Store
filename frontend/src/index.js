import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode >

      <App />

    </React.StrictMode>
  </Provider>,
  document.getElementById('root')

);