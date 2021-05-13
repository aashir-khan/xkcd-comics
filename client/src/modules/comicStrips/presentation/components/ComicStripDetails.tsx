import React from 'react';
import { ComicStrip } from '../../domain/ComicStrip';

import './ComicStripDetails.scss';

interface ComicStripDetailsProps {
  comicStrip: ComicStrip;
}
export const ComicStripDetails = ({ comicStrip }: ComicStripDetailsProps) => {
  return (
    <div className="comic-strip-details">
      <div className="metadata">
        <div>
          {comicStrip.title} (#{comicStrip.comicNumber})
        </div>
        <div className="smaller-text">
          Created: {comicStrip.dateCreated.format('MMMM DD YYYY')}
        </div>
        <div className="smaller-text">
          View Count: {comicStrip.numTimesViewed}
        </div>
      </div>
      <img
        className="comic-strip-image"
        src={comicStrip.imageLink}
        alt={comicStrip.title}
        title={comicStrip.alternativeText}
      />
    </div>
  );
};
