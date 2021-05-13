import { unionize, UnionOf, ofType } from 'unionize';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicStrip } from '../domain/ComicStrip';
import { ComicStripFailure } from '../domain/ComicStripFailure';

export const GetComicStripStateCases = unionize({
  loading: ofType<Record<string, never>>(),
  success: ofType<ComicStrip>(),
  failure: ofType<{ value: ComicStripFailure }>(),
});

type GetComicStripState = UnionOf<typeof GetComicStripStateCases>;

interface ComicStripState {
  getComicStrip: GetComicStripState;
  latestComicStripNumber: string | undefined;
}

const initialState: ComicStripState = {
  getComicStrip: GetComicStripStateCases.loading(),
  latestComicStripNumber: undefined,
};

export const comicStripsSlice = createSlice({
  name: 'comicStrips',
  initialState,
  reducers: {
    onGetComicStripSuccess(state, action: PayloadAction<ComicStrip>) {
      const comicStrip = action.payload;
      state.getComicStrip = GetComicStripStateCases.success(comicStrip);
    },
    onGetComicStripsFailure(state, action: PayloadAction<ComicStripFailure>) {
      const { payload: failure } = action;
      state.getComicStrip = GetComicStripStateCases.failure({
        value: failure,
      });
    },
    onGetLatestComicStripNumber(state, action: PayloadAction<string>) {
      state.latestComicStripNumber = action.payload;
    },
  },
});
