// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import contactsReducer from './contacts/contacts-reducer';
// import { contactApi } from './contacts/contactsSlice';

// export const store = configureStore({
//   reducer: {
//     contacts: contactsReducer,

//     [contactApi.reducerPath]: contactApi.reducer,
//   },
//   middleware: getDefaultMiddleware => [...getDefaultMiddleware(), contactApi.middleware],
//   devTools: process.env.NODE_ENV === 'development',
// });

// // export default store;

// setupListeners(store.dispatch);

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth';
import { setupListeners } from '@reduxjs/toolkit/query';
import contactsReducer from './contacts/contacts-reducer';
import { contactApi } from './contacts/contactsSlice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),

    contacts: contactsReducer,

    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
