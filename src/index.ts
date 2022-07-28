import { wizzard } from "./cli.js";
import { copyTemplate } from "./setup.js";

async function main() {
  const settings = await wizzard();

  console.log(settings);

  copyTemplate(settings);
}

main();
