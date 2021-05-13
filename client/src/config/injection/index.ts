// Sets up dependency injection (DI) using awilix package
// more information here: https://github.com/jeffijoe/awilix
import { AwilixContainer, createContainer } from 'awilix';
import { sharedInjection, SharedRegistrations } from './shared';
import { comicStripInjection, ComicStripRegistrations } from './comicStrip';

// registrations can be split up to be of types that are shared
// and of types that are specific to a module
type MyCradle = ComicStripRegistrations & SharedRegistrations;

// to ensure safety from misspellings of environment types when  setting up the application
// with specific environment-specific dependencies
export type EnvironmentTypes = 'production' | 'development' | 'test';

// function that configures injection
function configureInjection(environment: EnvironmentTypes) {
  // our DI container
  const container = createContainer<MyCradle>();

  function configureEnvironmentSpecificDependencies() {
    function registerTestDependencies() {
      // register any test environment specific dependencies (classes/values/etc) here
    }

    function registerProdAndDevCommonDependencies() {
      // register any dependencies that are shared between production and development environments here
      sharedInjection(environment).registerProdAndDevCommonDependencies(
        container
      );
      comicStripInjection().registerProdAndDevCommonDependencies(container);
    }

    if (environment === 'production' || environment === 'development') {
      registerProdAndDevCommonDependencies();
    } else {
      registerTestDependencies();
    }
  }

  configureEnvironmentSpecificDependencies();

  return container;
}

// a class to house a singleton of the DI container
// and to expose a `dispose` method on the DI container
export class DiContainer {
  private static instance: AwilixContainer<MyCradle>;

  private static isDisposed = false;

  public static setupInjection(
    environment: EnvironmentTypes = process.env.NODE_ENV
  ) {
    if (!DiContainer.instance || this.isDisposed) {
      DiContainer.instance = configureInjection(
        environment || process.env.NODE_ENV
      );
      this.isDisposed = false;
    }

    return DiContainer.instance;
  }

  public static dispose() {
    DiContainer.instance.dispose();
    DiContainer.isDisposed = true;
  }
}

export const diContainer = () => DiContainer.setupInjection();
