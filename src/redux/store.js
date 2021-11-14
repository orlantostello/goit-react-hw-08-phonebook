import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import contactsReducer from './contacts/contacts-reducer';
import { contactApi } from './contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,

    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), contactApi.middleware],
  devTools: process.env.NODE_ENV === 'development',
});

// export default store;

setupListeners(store.dispatch);
