import React from 'react';

import './ComicStripNavigation.scss';

interface ComicStripNavigationProps {
  isNextPageDisabled: boolean;
  isPreviousPageDisabled: boolean;
  onRequestNextPage: () => void;
  onRequestPreviousPage: () => void;
  onRequestRandomComicStrip: () => void;
}
export const ComicStripNavigation = ({
  isNextPageDisabled,
  isPreviousPageDisabled,
  onRequestNextPage,
  onRequestPreviousPage,
  onRequestRandomComicStrip,
}: ComicStripNavigationProps) => {
  return (
    <div className="comic-strip-navigation">
      <button disabled={isPreviousPageDisabled} onClick={onRequestPreviousPage}>
        &lt; Prev
      </button>
      <button onClick={onRequestRandomComicStrip}>Random</button>
      <button disabled={isNextPageDisabled} onClick={onRequestNextPage}>
        Next &gt;
      </button>
    </div>
  );
};
