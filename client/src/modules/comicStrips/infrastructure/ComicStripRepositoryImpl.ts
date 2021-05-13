import { Either, Right, Left } from 'purify-ts/Either';
import firebase from 'firebase/app';

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
import { GetComicStripOptions } from '../domain/sharedTypes';

interface Dependencies {
  baseApi: IBaseAPI;
  firestore: firebase.firestore.Firestore;
}

export class ComicStripRepositoryImpl implements IComicStripRepository {
  private baseApi: IBaseAPI;
  firestore: firebase.firestore.Firestore;

  constructor({ baseApi, firestore }: Dependencies) {
    this.baseApi = baseApi;
    this.firestore = firestore;
  }

  get latestComicStripNumber(): string {
    return '0';
  }

  async incrementComicStripViewCount(
    comicStrip: ComicStrip
  ): Promise<Either<ComicStripFailure, number>> {
    const firestore = this.firestore;
    const documentReference = firestore
      .collection('comicStrips')
      .doc(comicStrip.comicNumber);

    try {
      const documentSnapshot = await documentReference.get();
      const isDocumentExists = documentSnapshot.exists;
      let updatedViewCount: number;
      if (!isDocumentExists) {
        updatedViewCount = 1;
      } else {
        const data = documentSnapshot.data();
        if (data) {
          updatedViewCount = data.numTimesViewed + 1;
        } else {
          return Left(ComicStripFailureCases.unexpected());
        }
      }

      await documentReference.set(
        { numTimesViewed: updatedViewCount },
        { merge: isDocumentExists }
      );

      return Right(updatedViewCount);
    } catch (error) {
      return Left(this.getDomainFailureFromApiFailure(error));
    }
  }

  async getComicStrip({
    comicNumber,
  }: GetComicStripOptions): Promise<Either<ComicStripFailure, ComicStrip>> {
    const apiUrl = `/api/proxy/xkcd/${
      comicNumber === this.latestComicStripNumber ? '' : `${comicNumber}/`
    }info.0.json`;

    const comicStripOrError = await this.baseApi.get<ComicStripDTO>(
      apiUrl
      // try to uncomment this to see what happens when a failure is simulated
      // 'http://httpstat.us/500'
    );

    if (comicStripOrError.isLeft()) {
      return Left(
        this.getDomainFailureFromApiFailure(comicStripOrError.unsafeCoerce())
      );
    } else {
      const comicStripDTO = comicStripOrError.unsafeCoerce().data;
      const updatedViewCountOrError = await this.incrementComicStripViewCount(
        ComicStripMapper.toDomain(comicStripDTO)
      );

      return updatedViewCountOrError.caseOf({
        Left: (error) => Left(error),
        Right: (updatedViewCount) => {
          comicStripDTO.numTimesViewed = updatedViewCount;
          return Right(ComicStripMapper.toDomain(comicStripDTO));
        },
      });
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
