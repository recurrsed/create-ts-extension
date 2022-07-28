import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { ExtensionSettings } from "./cli.js";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
const PKG_ROOT = path.join(distPath, "../");

export async function copyTemplate({ name }: ExtensionSettings) {
  const projectDir = path.resolve(process.cwd(), name);
  const srcDir = path.join(PKG_ROOT, "template");

  await fs.copy(srcDir, projectDir);
}

export async function modifyPackageJson() {}
export async function modifyManifest() {}
