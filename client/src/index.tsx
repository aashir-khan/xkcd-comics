import { DiContainer } from './config/injection';
import { Application } from './shared/application';
import { Presentation } from './shared/presentation';

async function main(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    // Do NOT touch this line as it is used for production
    DiContainer.setupInjection('production');
  } else {
    /*
      You may change this to one of ['production', 'development', 'test]' to run the app in different environments. For example, you may want to run the app in a 'test' environment even while developing to work with
      fake data fetching.
    */
    DiContainer.setupInjection('production');
  }

  // presentation layer is potentially dependent on application layer, so make sure
  // that application is initialized before presentation layer is initialized
  await Application.init();
  Presentation.init();
}

main();
