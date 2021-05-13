import { asFunction, AwilixContainer } from 'awilix';
import { EnvironmentTypes } from '.';
import { BaseAPI, IBaseAPI } from '../../shared/infrastructure/BaseApi';

// the shape of the general dependencies/registrations
export type SharedRegistrations = {
  baseApi: IBaseAPI;
};

export const sharedInjection = (environment: EnvironmentTypes) => ({
  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    const baseUrl =
      environment === 'production'
        ? (process.env.REACT_APP_BASE_API_URL_PROD as string)
        : (process.env.REACT_APP_BASE_API_URL_DEV as string);

    container.register({
      baseApi: asFunction(() => new BaseAPI(baseUrl)).singleton(),
    });
  },
});
