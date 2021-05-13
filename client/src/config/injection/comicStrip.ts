import { asClass, AwilixContainer } from 'awilix';
import { IComicStripRepository } from '../../modules/comicStrips/domain/IComicStripRepository';
import { IComicStripService } from '../../modules/comicStrips/domain/IComicStripService';
import { ComicStripRepositoryImpl } from '../../modules/comicStrips/infrastructure/ComicStripRepositoryImpl';
import { ComicStripServiceImpl } from '../../modules/comicStrips/infrastructure/ComicStripServiceImpl';

// the shape of the dependencies/registrations of the comicStrips module
export type ComicStripRegistrations = {
  comicStripRepository: IComicStripRepository;
  comicStripService: IComicStripService;
};

export const comicStripInjection = () => ({
  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      comicStripRepository: asClass(ComicStripRepositoryImpl).singleton(),
      comicStripService: asClass(ComicStripServiceImpl).singleton(),
    });
  },
});
