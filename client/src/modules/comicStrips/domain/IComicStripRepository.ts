import { Either } from 'purify-ts/Either';

import { ComicStrip } from './ComicStrip';
import { ComicStripFailure } from './ComicStripFailure';

interface Options {
  comicNumber: string;
}
export abstract class IComicStripRepository {
  abstract getComicStrip(
    options: Options
  ): Promise<Either<ComicStripFailure, ComicStrip>>;

  abstract getRandomComicStrip(): Promise<
    Either<ComicStripFailure, ComicStrip>
  >;
}
