import { promises as fs } from "node:fs";
import { format, resolveConfig } from "prettier";

const PACKAGE_PATH = "package.json";
const MANIFEST_PATH = "module.json";
const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const packageJson = JSON.parse(await fs.readFile(PACKAGE_PATH, "utf8"));
const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
const version = packageJson.version;

if (typeof version !== "string" || !VERSION_PATTERN.test(version)) {
	throw new Error(`package.json contains an invalid semantic version: ${version}`);
}

if (typeof manifest.url !== "string" || manifest.url.length === 0) {
	throw new Error("module.json must define a repository URL before its version can be synchronized.");
}

manifest.version = version;
manifest.download = `${manifest.url.replace(/\/$/, "")}/releases/download/v${version}/module.zip`;

const prettierOptions = (await resolveConfig(MANIFEST_PATH)) ?? {};
const formattedManifest = await format(JSON.stringify(manifest), { ...prettierOptions, filepath: MANIFEST_PATH });
await fs.writeFile(MANIFEST_PATH, formattedManifest);
console.log(`Synchronized module.json to version ${version}.`);
