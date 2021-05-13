import { Either, Right, Left } from 'purify-ts/Either';

import {
  FailedApiResponse,
  IBaseAPI,
} from '../../../shared/infrastructure/BaseApi';
import { IComicStripRepository } from '../domain/IComicStripRepository';
import { ComicStrip } from '../domain/ComicStrip';
import {
  ComicStripFailure,
  ComicStripFailureCases,
} from '../domain/ComicStripFailure';
import { ComicStripMapper } from './ComicStripMapper';
import { ComicStripDTO } from './ComicStripDTO';

interface Dependencies {
  baseApi: IBaseAPI;
}

export class ComicStripRepositoryImpl implements IComicStripRepository {
  private baseApi: IBaseAPI;

  constructor({ baseApi }: Dependencies) {
    this.baseApi = baseApi;
  }

  async getComicStrip({
    comicNumber,
  }: any): Promise<Either<ComicStripFailure, ComicStrip>> {
    const apiUrl = `/api/proxy/xkcd/${
      comicNumber === '0' ? '' : `${comicNumber}/`
    }info.0.json`;

    const comicStripOrError = await this.baseApi.get<ComicStripDTO>(
      apiUrl
      // try to uncomment this to see what happens when a failure is simulated
      // 'http://httpstat.us/500'
    );

    return comicStripOrError.caseOf({
      Left: (error) => Left(this.getDomainFailureFromApiFailure(error)),
      Right: ({ data: comicStripDTO }) =>
        Right(ComicStripMapper.toDomain(comicStripDTO)),
    });
  }

  async getRandomComicStrip(): Promise<Either<ComicStripFailure, ComicStrip>> {
    const latestComicStripOrError = await this.getComicStrip({
      comicNumber: '0',
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

  getDomainFailureFromApiFailure(
    apiFailure: FailedApiResponse
  ): ComicStripFailure {
    if (apiFailure.status) {
      if (apiFailure.status >= 500) {
        return ComicStripFailureCases.serverError();
      }
      if (apiFailure.status === 404) {
        return ComicStripFailureCases.notFound();
      }
      return ComicStripFailureCases.unexpected();
    }

    return ComicStripFailureCases.unexpected({ message: apiFailure.message });
  }
}
