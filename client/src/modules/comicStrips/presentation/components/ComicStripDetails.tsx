import React from 'react';
import { ComicStrip } from '../../domain/ComicStrip';

import './ComicStripDetails.scss';

interface ComicStripDetailsProps {
  comicStrip: ComicStrip;
}
export const ComicStripDetails = ({ comicStrip }: ComicStripDetailsProps) => {
  return (
    <div className="comic-strip-details">
      <div className="title-and-date-create">
        <div className="title">{comicStrip.title}</div>
        <div className="date-create">
          Created: {comicStrip.dateCreated.format('MMMM DD YYYY')}
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
