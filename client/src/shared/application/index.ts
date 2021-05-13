import { getLatestComicStrip } from '../../modules/comicStrips/application';
import { store } from './store';

export class Application {
  static async init(): Promise<void> {
    await store.dispatch(getLatestComicStrip());
  }
}
