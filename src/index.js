import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {store} from './store.js'
import { ScrollToTop } from "./assets/ScrollToTop";
import './index.css';

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop/>
          <App/>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
