import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import authReducer from './auth/authReducer';
import markersSlice from './map/markerSlice';
import mapSlice from './map/mapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    markers: markersSlice,
    map: mapSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== 'production' ? [logger] : []),
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
