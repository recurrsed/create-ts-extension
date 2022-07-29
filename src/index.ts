import { wizzard } from "./cli.js";
import {
  checkProjectExists,
  copyTemplate,
  modifyManifest,
  modifyPackageJson,
  setupPackageJson,
} from "./setup.js";

async function main() {
  const settings = await wizzard();

  console.log(settings);

  try {
    await checkProjectExists(settings);
    await copyTemplate(settings);
    await setupPackageJson(settings);
    await modifyPackageJson(settings);
    await modifyManifest(settings);

    console.log("Project setup complete.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
