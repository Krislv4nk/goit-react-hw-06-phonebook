import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contacts/contactsReducer';
import filterReducer from './filter/filterReducer';

 const rootReducer = {
  contacts: contactsReducer,
  filter: filterReducer,
};

 export const store = configureStore({
  reducer: rootReducer,
});


 