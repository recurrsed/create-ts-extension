import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { ExtensionSettings } from "./cli.js";
import { exec } from "child_process";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
const PKG_ROOT = path.join(distPath, "../");

export async function checkProjectExists({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(projectDir)) {
    const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
      name: "overwrite",
      type: "confirm",
      message: `${name} directory already exists. Do you want to overwrite it?`,
      default: false,
    });

    if (!overwrite) {
      console.log("Aborting...");
      process.exit(0);
    }

    fs.emptyDirSync(projectDir);
  }
}

export async function copyTemplate({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);
  const srcDir = path.join(PKG_ROOT, "template");

  await fs.copy(srcDir, projectDir);
}

export function setupPackageJson({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);

  return new Promise((resolve, reject) => {
    exec(`pnpm init`, { cwd: projectDir }, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
      }

      if (stderr) {
        reject(stderr);
      }

      resolve(stdout);
    });
  });
}

export async function modifyPackageJson({
  name,
  description,
}: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);
  const packagejson = fs.readJsonSync(`${projectDir}/package.json`);

  const updatedPackageJson = {
    ...packagejson,
    description,
    scripts: {
      ...packagejson.scripts,
      build: "rm -rf ./dist && webpack",
    },
  };

  fs.writeJsonSync(`${projectDir}/package.json`, updatedPackageJson, {
    spaces: 2,
  });
}

export async function modifyManifest({
  name,
  permissions,
  host_permissions,
}: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);
  const manifest = fs.readJsonSync(`${projectDir}/src/manifest.json`);

  const updatedManifest = {
    ...manifest,
    permissions,
    host_permissions,
  };

  fs.writeJsonSync(`${projectDir}/src/manifest.json`, updatedManifest, {
    spaces: 2,
  });
}

export async function installDependencies({ name }: ExtensionSettings) {}
