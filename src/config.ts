import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { exec } from "child_process";

export const __filename = fileURLToPath(import.meta.url);
export const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const execAsync = promisify(exec);

export const DEV_PACKAGES = [
  "@types/chrome",
  "copy-webpack-plugin",
  "css-loader",
  "eslint",
  "sass",
  "sass-loader",
  "style-loader",
  "ts-loader",
  "typescript",
  "webpack",
  "webpack-cli",
];
