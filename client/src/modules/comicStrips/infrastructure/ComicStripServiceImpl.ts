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

  async getRandomComicStrip(): Promise<Either<ComicStripFailure, ComicStrip>> {
    const latestComicStripOrError = await this.getComicStrip({
      comicNumber: this.comicStripRepository.latestComicStripNumber,
    });

    if (latestComicStripOrError.isLeft()) {
      return latestComicStripOrError.unsafeCoerce();
    } else {
      const latestComicStrip = latestComicStripOrError.unsafeCoerce();
      const { comicNumber: maxComicNumber } = latestComicStrip;
      const randomComicStripNumber = `${Math.floor(
        Math.random() * Number(maxComicNumber) + 1
      )}`;

      return await this.getComicStrip({ comicNumber: randomComicStripNumber });
    }
  }
}
