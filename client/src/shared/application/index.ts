import { getLatestComicStrip } from '../../modules/comicStrips/application';
import { store } from './store';

export class Application {
  static async init(): Promise<void> {
    // make sure to get the latest comic strip so that we have can become
    // aware of the upper bound on the comic strip number
    return store.dispatch(getLatestComicStrip());
  }
}
