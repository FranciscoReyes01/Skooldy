import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase, { app } from 'firebase'
import PlataformasGame from './Components/PlataformasGame';
import Hola from './Components/ContentInst.js'


firebase.initializeApp({
  apiKey: "AIzaSyBH0SH_zHJ-d7ax2YBn4NNMXdg92o6Vm3g",
  authDomain: "auth-study-9f668.firebaseapp.com",
  databaseURL: "https://auth-study-9f668.firebaseio.com",
  projectId: "auth-study-9f668",
  storageBucket: "auth-study-9f668.appspot.com",
  messagingSenderId: "751715697885",
  appId: "1:751715697885:web:80c47aeed37933b9a7c734"
})

ReactDOM.render(
  <React.StrictMode>

    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
