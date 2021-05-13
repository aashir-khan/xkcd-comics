import { asClass, AwilixContainer } from 'awilix';
import { IComicStripRepository } from '../../modules/comicStrips/domain/IComicStripRepository';
import { ComicStripRepositoryImpl } from '../../modules/comicStrips/infrastructure/ComicStripRepositoryImpl';

// the shape of the dependencies/registrations of the comicStrips module
export type ComicStripRegistrations = {
  comicStripRepository: IComicStripRepository;
};

export const comicStripInjection = () => ({
  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      comicStripRepository: asClass(ComicStripRepositoryImpl).singleton(),
    });
  },
});
