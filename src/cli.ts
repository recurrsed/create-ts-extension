import inquirer from "inquirer";
import { program } from "commander";
import chalk from "chalk";

export interface ExtensionSettings {
  name: string;
  description: string;
  hasPopupActionBtn: boolean;
  hasBackgroundWorker: boolean;
  permissions: string[];
  host_permissions: string[];
}

const DEFAULT_SETTINGS: ExtensionSettings = {
  name: "my-extension",
  hasPopupActionBtn: false,
  hasBackgroundWorker: false,
  description: "Extension description",
  permissions: [],
  host_permissions: [],
};

export async function wizzard() {
  const settings: ExtensionSettings = DEFAULT_SETTINGS;

  console.log(
    chalk.bold.blueBright(`

    create-extension wizzard

   `)
  );

  program
    .description("Create your browser extension.")
    .argument("[dir]", "Name of the extension");

  const extensionName = program.args[0];

  if (extensionName) {
    settings.name = extensionName;
  }

  if (!extensionName) {
    const { name } = await inquirer.prompt<Pick<ExtensionSettings, "name">>({
      name: "name",
      type: "input",
      message: "What is the name of your extension?",
      default: settings.name,
      transformer: (input: string) => input.trim(),
    });
    settings.name = name;
  }

  const { description } = await inquirer.prompt<
    Pick<ExtensionSettings, "description">
  >({
    name: "description",
    type: "input",
    message: "Brief extension description...",
    default: settings.description,
    transformer: (input: string) => input.trim(),
  });
  settings.description = description;

  const { hasBackgroundWorker } = await inquirer.prompt<
    Pick<ExtensionSettings, "hasBackgroundWorker">
  >({
    name: "hasBackgroundWorker",
    type: "confirm",
    message: "Does your extension need a service worker? (background.js)",
    default: settings.hasBackgroundWorker,
  });

  settings.hasBackgroundWorker = hasBackgroundWorker;

  return settings;
}
