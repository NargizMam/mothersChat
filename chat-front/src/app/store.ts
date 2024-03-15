import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import persistStore from 'redux-persist/es/persistStore';
import {usersReducer} from "../features/users/usersSlice.ts";
import {tracksReducer} from "../features/tracks/tracksSlice.ts";
import {albumsReducer} from "../features/ albums/albumsSlice.ts";
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {trackHistoryReducer} from "../features/trackHistories/trackHistorySlice.ts";
import {adminsReducer} from "../../../../drawing-ws/frontend/src/Admins/adminsSlice.tsx";
import {warningMessageReducer} from "../features/WarningMessage/warningMessageSlice.ts";

const usersPersistConfig = {
  key: 'shop:users',
  storage: storage,
  whitelist: ['user'],

};
const rootReducer = combineReducers({
  tracks: tracksReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  admins: adminsReducer,
  trackHistory: trackHistoryReducer,
  warningMessage: warningMessageReducer,
  users: persistReducer(usersPersistConfig, usersReducer)
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;