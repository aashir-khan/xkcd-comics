import { Either, Right } from 'purify-ts/Either';

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

  async getRandomComicStrip(
    maxComicStripNumber: string
  ): Promise<Either<ComicStripFailure, ComicStrip>> {
    const randomComicStripNumber = `${Math.floor(
      Math.random() * Number(maxComicStripNumber) + 1
    )}`;

    return this.getComicStrip({ comicNumber: randomComicStripNumber });
  }

  async getLatestComicStripNumber(): Promise<
    Either<ComicStripFailure, number>
  > {
    const latestComicStripOrError = await this.getComicStrip({
      comicNumber: this.comicStripRepository.latestComicStripNumber,
    });

    if (latestComicStripOrError.isLeft()) {
      return latestComicStripOrError.unsafeCoerce();
    } else {
      const latestComicStrip = latestComicStripOrError.unsafeCoerce();
      return Right(Number(latestComicStrip.comicNumber));
    }
  }
}
