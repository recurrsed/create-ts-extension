import inquirer from "inquirer";
import { program } from "commander";

interface ExtensionSettings {
  name: string;
  hasPopupActionBtn: boolean;
  hasBackgroundWorker: boolean;
}

const DEFAULT_SETTINGS: ExtensionSettings = {
  name: "my-extension",
  hasPopupActionBtn: false,
  hasBackgroundWorker: false,
};

async function main() {
  const settings: ExtensionSettings = DEFAULT_SETTINGS;

  console.log("create-extension wizzard");

  program
    .description("Create your browser extension.")
    .argument("[dir]", "Name of the extension");

  const extensionName = program.args[0];

  if (!extensionName) {
    settings.name = extensionName;
  }

  if (!extensionName) {
    const { name } = await inquirer.prompt<Pick<ExtensionSettings, "name">>({
      name: "extensionName",
      type: "input",
      message: "What is the name of your extension?",
      default: DEFAULT_SETTINGS.name,
      transformer: (input: string) => input.trim(),
    });
    settings.name = name;
  }

  const { hasBackgroundWorker } = await inquirer.prompt<
    Pick<ExtensionSettings, "hasBackgroundWorker">
  >({
    name: "hasBackgroundWorker",
    type: "confirm",
    message: "Does your extension need a service worker? (background.js)",
    default: DEFAULT_SETTINGS.hasBackgroundWorker,
  });

  settings.hasBackgroundWorker = hasBackgroundWorker;

  console.log("args", program.args);
  console.log("settings", settings);
}

main();
