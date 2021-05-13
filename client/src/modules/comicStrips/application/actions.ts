import { comicStripsSlice } from '.';
import { diContainer } from '../../../config/injection';
import { AppThunk } from '../../../shared/application/store';

export const getComicStrip = ({
  comicNumber,
}: {
  comicNumber: string;
}): AppThunk => {
  return async function (dispatch) {
    const { comicStripRepository } = diContainer().cradle;
    const comicStripOrFailure = await comicStripRepository.getComicStrip({
      comicNumber,
    });

    comicStripOrFailure.caseOf<void>({
      Left: (failure) =>
        dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
      Right: (comicStrip) =>
        dispatch(comicStripsSlice.actions.onGetComicStripSuccess(comicStrip)),
    });
  };
};

export const getRandomComicStrip = (): AppThunk => {
  return async function (dispatch) {
    const { comicStripRepository } = diContainer().cradle;
    const comicStripOrFailure = await comicStripRepository.getRandomComicStrip();

    comicStripOrFailure.caseOf<void>({
      Left: (failure) =>
        dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
      Right: (comicStrip) =>
        dispatch(comicStripsSlice.actions.onGetComicStripSuccess(comicStrip)),
    });
  };
};
