import path from "path";
import fs from "fs-extra";
import inquirer from "inquirer";

import { ExtensionSettings } from "./cli.js";
import { DEV_PACKAGES, execAsync, PKG_ROOT } from "./config.js";

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

export async function setupPackageJson({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);

  await execAsync("pnpm init", { cwd: projectDir });
}

export async function modifyPackageJson({
  name,
  description,
}: ExtensionSettings) {
  console.log("Setting up devDepenencies.");

  const projectDir = path.resolve(process.cwd(), name);
  const packagejson = fs.readJsonSync(`${projectDir}/package.json`);
  const devDependencies = await generateDevDependencies();

  const updatedPackageJson = {
    ...packagejson,
    description,
    scripts: {
      ...packagejson.scripts,
      build: "rm -rf ./dist && webpack",
    },
    devDependencies,
  };

  fs.writeJsonSync(`${projectDir}/package.json`, updatedPackageJson, {
    spaces: 2,
  });
}

async function generateDevDependencies() {
  const deps: Record<string, string> = {};

  for (const pkg of DEV_PACKAGES) {
    const { stdout: latestVersion } = await execAsync(
      `npm show ${pkg} version`
    );
    if (!latestVersion) {
      console.log("Could not find latest version for", pkg);
      continue;
    }

    deps[pkg] = `^${latestVersion.trim()}`;
  }

  return deps;
}

export async function installDependencies({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);

  console.log("Installing dependencies...");

  await execAsync("pnpm install", { cwd: projectDir });
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
