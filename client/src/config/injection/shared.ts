import { asFunction, AwilixContainer } from 'awilix';
import { EnvironmentTypes } from '.';
import { BaseAPI, IBaseAPI } from '../../shared/infrastructure/BaseApi';
import firebase from 'firebase/app';
import 'firebase/firestore';

// the shape of the general dependencies/registrations
export type SharedRegistrations = {
  baseApi: IBaseAPI;
  firestore: firebase.firestore.Firestore;
};

export const sharedInjection = (environment: EnvironmentTypes) => ({
  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    const baseUrl =
      environment === 'production'
        ? (process.env.REACT_APP_BASE_API_URL_PROD as string)
        : (process.env.REACT_APP_BASE_API_URL_DEV as string);

    container.register({
      baseApi: asFunction(() => new BaseAPI(baseUrl)).singleton(),
      firestore: asFunction(() => {
        const firebaseConfig = {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        };

        firebase.initializeApp(firebaseConfig);
        return firebase.firestore();
      }).singleton(),
    });
  },
});
