import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, useHistory } from 'react-router-dom';

import './index.css';
import { Application } from './Application';
import reportWebVitals from './reportWebVitals';
import { createStore } from './store';

const Test = () => {
  const history = useHistory();

  const store = React.useMemo(() => createStore(history), [history]);

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Test />
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
