import { Config } from "./config";
import { Application } from "./shared/application";
import { Presentation } from "./shared/presentation";

async function main(): Promise<void> {
  Config.init();

  // presentation layer is potentially dependent on application layer, so make sure
  // that application is initialized before presentation layer is initialized
  await Application.init();
  Presentation.init();
}

main();
