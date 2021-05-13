import { Either } from 'purify-ts/Either';

import { ComicStrip } from './ComicStrip';
import { ComicStripFailure } from './ComicStripFailure';
import { GetComicStripOptions } from './sharedTypes';

export abstract class IComicStripService {
  abstract getComicStrip(
    options: GetComicStripOptions
  ): Promise<Either<ComicStripFailure, ComicStrip>>;

  abstract getRandomComicStrip(
    maxComicStripNumber: string
  ): Promise<Either<ComicStripFailure, ComicStrip>>;
}
