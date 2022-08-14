import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 
import {Provider} from "react-redux"; // Provider es un componente que nos permite acceder a la store
import {store} from "./store"; // store es la store que creamos en el archivo store/index.js

ReactDOM.render(
    <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
