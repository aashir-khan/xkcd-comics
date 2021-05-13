import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComicStripContainer } from '../modules/comicStrips/presentation/components/ComicStripContainer';
import {
  getComicStrip,
  GetComicStripStateCases,
  getRandomComicStrip,
} from '../modules/comicStrips/application';
import { RootState } from '../shared/application/store';

import './HomePage.scss';
import { ComicStripFailureCases } from '../modules/comicStrips/domain/ComicStripFailure';
import { presentationEnums } from '../shared/presentation/enums';
import { useParams } from 'react-router';

const { errorMessages } = presentationEnums;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch();
  const params = useParams<{ comicNumber?: string }>();
  // 0 means current (latest) comic strip number
  const [comicNumber, setComicNumber] = useState(params.comicNumber ?? '0');

  const { stateValueGetComicStrip, latestComicStripNumber } = useSelector(
    (state: RootState) => ({
      stateValueGetComicStrip: state.comicStrips.getComicStrip,
      latestComicStripNumber: state.comicStrips.latestComicStripNumber,
    })
  );

  const handleRequestChangePage = ({
    isRequestNext,
  }: {
    isRequestNext?: boolean;
  } = {}) => {
    // don't attempt to handle a change page request if we haven't successfully already
    // gotten some comic strip (i.e. we are not in loading or failure state)
    if (GetComicStripStateCases.is.success(stateValueGetComicStrip)) {
      const currentComicStrip = stateValueGetComicStrip;

      let newComicNumberToGet: string;

      // if we don't passs in a value, that means we wat to get a random comic strip
      if (isRequestNext === undefined) {
        dispatch(getRandomComicStrip());
      } else {
        if (isRequestNext === true) {
          newComicNumberToGet = `${Number(currentComicStrip.comicNumber) + 1}`;
        } else {
          newComicNumberToGet = `${Number(currentComicStrip.comicNumber) - 1}`;
        }

        setComicNumber(newComicNumberToGet);
        dispatch(getComicStrip({ comicNumber: newComicNumberToGet }));
      }
    }
  };

  const handleRequestPreviousPage = () => {
    handleRequestChangePage({ isRequestNext: false });
  };

  const handleRequestNextPage = () => {
    handleRequestChangePage({ isRequestNext: true });
  };

  const handleRequestRandomComicStrip = () => {
    handleRequestChangePage();
  };

  useEffect(() => {
    dispatch(getComicStrip({ comicNumber }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="page-root">
      {/* Go through each possible state case for getting comic strip and
      render the appropriate JSX depending on the state case */}
      {GetComicStripStateCases.match(stateValueGetComicStrip, {
        loading: () => <>Loading...</>,
        failure: ({ value: failure }) => (
          <>
            {ComicStripFailureCases.match(failure, {
              serverError: () => errorMessages.server,
              unexpected: () => errorMessages.unexpected,
              notFound: () =>
                errorMessages.notFound(`comic strip #${comicNumber}`),
            })}
          </>
        ),
        success: (comicStrip) => (
          <div className="content">
            <ComicStripContainer
              comicStrip={comicStrip}
              latestComicStripNumber={latestComicStripNumber}
              onRequestNextPage={handleRequestNextPage}
              onRequestPreviousPage={handleRequestPreviousPage}
              onRequestRandomComicStrip={handleRequestRandomComicStrip}
            />
          </div>
        ),
      })}
    </div>
  );
};
