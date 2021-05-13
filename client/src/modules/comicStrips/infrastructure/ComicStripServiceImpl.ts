import { Either } from 'purify-ts/Either';

import { IComicStripService } from '../domain/IComicStripService';
import { ComicStrip } from '../domain/ComicStrip';
import { ComicStripFailure } from '../domain/ComicStripFailure';
import { IComicStripRepository } from '../domain/IComicStripRepository';
import { GetComicStripOptions } from '../domain/sharedTypes';

interface Dependencies {
  comicStripRepository: IComicStripRepository;
}

export class ComicStripServiceImpl implements IComicStripService {
  comicStripRepository: IComicStripRepository;

  constructor({ comicStripRepository }: Dependencies) {
    this.comicStripRepository = comicStripRepository;
  }

  getComicStrip(
    options: GetComicStripOptions
  ): Promise<Either<ComicStripFailure, ComicStrip>> {
    return this.comicStripRepository.getComicStrip(options);
  }

  getRandomComicStrip(
    maxComicStripNumber: string
  ): Promise<Either<ComicStripFailure, ComicStrip>> {
    // in the range [1, maxComicStripNumber]
    const randomComicStripNumber = `${Math.floor(
      Math.random() * Number(maxComicStripNumber) + 1
    )}`;

    return this.getComicStrip({ comicNumber: randomComicStripNumber });
  }

  getLatestComicStrip(): Promise<Either<ComicStripFailure, ComicStrip>> {
    return this.comicStripRepository.getLatestComicStrip();
  }
}
