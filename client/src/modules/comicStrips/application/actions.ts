import { comicStripsSlice } from '.';
import { diContainer } from '../../../config/injection';
import { AppThunk } from '../../../shared/application/store';
import { ComicStripFailureCases } from '../domain/ComicStripFailure';

export const getComicStrip = ({
  comicNumber,
}: {
  comicNumber: string;
}): AppThunk => {
  return async function (dispatch, getState) {
    const { comicStripService } = diContainer().cradle;
    const latestComicStripNumber = getState().comicStrips
      .latestComicStripNumber;

    if (
      latestComicStripNumber &&
      Number(comicNumber) <= Number(latestComicStripNumber)
    ) {
      const comicStripOrFailure = await comicStripService.getComicStrip({
        comicNumber,
      });

      comicStripOrFailure.caseOf<void>({
        Left: (failure) =>
          dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
        Right: (comicStrip) =>
          dispatch(comicStripsSlice.actions.onGetComicStripSuccess(comicStrip)),
      });
    } else {
      dispatch(
        comicStripsSlice.actions.onGetComicStripsFailure(
          ComicStripFailureCases.notFound()
        )
      );
    }
  };
};

export const getRandomComicStrip = (): AppThunk => {
  return async function (dispatch, getState) {
    const { comicStripService } = diContainer().cradle;
    const latestComicStripNumber = getState().comicStrips
      .latestComicStripNumber;

    if (latestComicStripNumber) {
      const comicStripOrFailure = await comicStripService.getRandomComicStrip(
        latestComicStripNumber
      );

      comicStripOrFailure.caseOf<void>({
        Left: (failure) =>
          dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
        Right: (comicStrip) =>
          dispatch(comicStripsSlice.actions.onGetComicStripSuccess(comicStrip)),
      });
    }
  };
};

export const getLatestComicStrip = (): AppThunk => {
  return async function (dispatch) {
    const { comicStripService } = diContainer().cradle;
    const comicStripOrFailure = await comicStripService.getComicStrip({
      comicNumber: '0',
    });

    comicStripOrFailure.caseOf<void>({
      Left: (failure) =>
        dispatch(comicStripsSlice.actions.onGetComicStripsFailure(failure)),
      Right: (comicStrip) =>
        dispatch(
          comicStripsSlice.actions.onGetLatestComicStripNumber(
            comicStrip.comicNumber
          )
        ),
    });
  };
};
