import React from 'react';
import { ComicStrip } from '../../domain/ComicStrip';

import './ComicStripNavigation.scss';

interface ComicStripNavigationProps {
  comicStrip: ComicStrip;
  latestComicStripNumber?: string;
  onRequestNextPage: () => void;
  onRequestPreviousPage: () => void;
  onRequestRandomComicStrip: () => void;
}
export const ComicStripNavigation = ({
  comicStrip,
  onRequestNextPage,
  latestComicStripNumber,
  onRequestPreviousPage,
  onRequestRandomComicStrip,
}: ComicStripNavigationProps) => {
  return (
    <div className="comic-strip-navigation">
      <button
        disabled={comicStrip.comicNumber === '1'}
        onClick={onRequestPreviousPage}
      >
        &lt; Prev
      </button>
      <button onClick={onRequestRandomComicStrip}>Random</button>
      <button
        disabled={comicStrip.comicNumber === latestComicStripNumber}
        onClick={onRequestNextPage}
      >
        Next &gt;
      </button>
    </div>
  );
};
