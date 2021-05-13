import React from 'react';

import './ComicStripNavigation.scss';

interface ComicStripNavigationProps {
  onRequestNextPage: () => void;
  onRequestPreviousPage: () => void;
  onRequestRandomComicStrip: () => void;
}
export const ComicStripNavigation = ({
  onRequestNextPage,
  onRequestPreviousPage,
  onRequestRandomComicStrip,
}: ComicStripNavigationProps) => {
  return (
    <div className="comic-strip-navigation">
      <button onClick={onRequestPreviousPage}>&lt; Prev</button>
      <button onClick={onRequestRandomComicStrip}>Random</button>
      <button onClick={onRequestNextPage}>Next &gt;</button>
    </div>
  );
};
