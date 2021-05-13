import { comicStripsSlice } from '.';
import { diContainer } from '../../../config/injection';
import { AppThunk } from '../../../shared/application/store';

export const getComicStrip = ({
  comicNumber,
}: {
  comicNumber: string;
}): AppThunk => {
  return async function (dispatch) {
    const { comicStripService } = diContainer().cradle;
    const comicStripOrFailure = await comicStripService.getComicStrip({
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
    const { comicStripService } = diContainer().cradle;
    const comicStripOrFailure = await comicStripService.getRandomComicStrip();

    comicStripOrFailure.caseOf<void>({
      Left: (failure) =>
        dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
      Right: (comicStrip) =>
        dispatch(comicStripsSlice.actions.onGetComicStripSuccess(comicStrip)),
    });
  };
};
