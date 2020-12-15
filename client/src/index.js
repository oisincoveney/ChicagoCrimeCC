import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css'
import {FirebaseAppProvider} from 'reactfire'


const firebaseConfig = {
  apiKey: "AIzaSyAwNJVt9yQmEEH-W9sUFRu3phElU3IVVTA",
  authDomain: "ca675-59605.firebaseapp.com",
  databaseURL: "https://ca675-59605-default-rtdb.firebaseio.com",
  projectId: "ca675-59605",
  storageBucket: "ca675-59605.appspot.com",
  messagingSenderId: "115195367191",
  appId: "1:115195367191:web:d32924627b2c6ee5d43152",
  measurementId: "G-Z0CV51HVKN"
};


ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById('root')
);