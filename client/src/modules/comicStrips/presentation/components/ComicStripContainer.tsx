import React from 'react';
import { ComicStrip } from '../../domain/ComicStrip';
import { ComicStripDetails } from './ComicStripDetails';

import './ComicStripContainer.scss';
import { ComicStripNavigation } from './ComicStripNavigation';

interface ComicStripContainerProps {
  latestComicStripNumber?: string;
  comicStrip: ComicStrip;
  onRequestNextPage: () => void;
  onRequestPreviousPage: () => void;
  onRequestRandomComicStrip: () => void;
}
export const ComicStripContainer = ({
  comicStrip,
  onRequestNextPage,
  onRequestPreviousPage,
  onRequestRandomComicStrip,
  latestComicStripNumber,
}: ComicStripContainerProps) => {
  return (
    <div className="comic-strip-container">
      <ComicStripDetails comicStrip={comicStrip} />
      <ComicStripNavigation
        isNextPageDisabled={comicStrip.comicNumber === latestComicStripNumber}
        isPreviousPageDisabled={comicStrip.comicNumber === '1'}
        onRequestNextPage={onRequestNextPage}
        onRequestPreviousPage={onRequestPreviousPage}
        onRequestRandomComicStrip={onRequestRandomComicStrip}
      />
    </div>
  );
};
