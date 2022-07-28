import inquirer from "inquirer";
import { program } from "commander";
import path from "path";
import { fileURLToPath } from "url";

interface ExtensionSettings {
  name: string;
  description: string;
  hasPopupActionBtn: boolean;
  hasBackgroundWorker: boolean;
}

const DEFAULT_SETTINGS: ExtensionSettings = {
  name: "my-extension",
  hasPopupActionBtn: false,
  hasBackgroundWorker: false,
  description: "Extension description",
};

async function wizzard() {
  const settings: ExtensionSettings = DEFAULT_SETTINGS;

  console.log("create-extension wizzard");

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

function createProject({ name }: ExtensionSettings) {
  const __filename = fileURLToPath(import.meta.url);
  const distPath = path.dirname(__filename);
  const PKG_ROOT = path.join(distPath, "../");
  const projectDir = path.resolve(process.cwd(), name);

  path.join();
}

async function main() {
  const settings = await wizzard();

  console.log(settings);

  createProject(settings);
}

main();
