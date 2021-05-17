import { DiContainer } from "./injection";

export class Config {
  static init() {
    if (process.env.NODE_ENV === "production") {
      // Do NOT touch this line as it is used for production
      DiContainer.setupInjection("production");
    } else {
      /*
        You may change this to one of ['production', 'development', 'test]' to run the app in different environments. For example, you may want to run the app in a 'test' environment even while developing to work with
        fake data fetching.
      */
      DiContainer.setupInjection("production");
    }
  }
}
