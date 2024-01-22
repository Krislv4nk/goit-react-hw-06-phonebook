import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App/App';
import { Provider } from "react-redux";
import{ PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor} loading={null}>
     <Provider store={store}>
    <BrowserRouter basename="/goit-react-hw-06-phonebook">
  <App />  
    </BrowserRouter>
    </Provider>
    </PersistGate>
  </React.StrictMode>
);
