import {
  Action,
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { comicStripsSlice } from '../../modules/comicStrips/application';

export const rootReducer = combineReducers({
  comicStrips: comicStripsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
