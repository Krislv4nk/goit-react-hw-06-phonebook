import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App/App';
import { Provider } from "react-redux";
import{ PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './components/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate persistor={persistor} loading={null}>
    <BrowserRouter basename="/goit-react-hw-06-phonebook">
  <App />  
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
