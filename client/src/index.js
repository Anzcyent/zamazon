import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from './redux/configureStore';
import "animate.css"

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><Router><App /></Router></Provider>);

