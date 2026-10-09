# Contributing

## Development

- `npm install` installs development dependencies.
- `npm run lint` checks the JavaScript source with ESLint.
- `npm run lint:fix` applies safe automatic ESLint fixes.
- `npm run format` formats maintained source files with Prettier.
- `npm run format:check` checks formatting without changing files.
- `npm run check` checks both formatting and lint rules.
- `npm run fix` formats files and applies safe ESLint fixes.

## Version policy

These modules use semantic versions. While the version remains below `1.0.0`, use:

- **Patch** (`0.1.0` to `0.1.1`) for bug fixes, text or balance corrections, internal refactoring, tooling, and documentation that preserve existing behavior and identifiers.
- **Minor** (`0.1.1` to `0.2.0`) for new functionality, new game content, and breaking alpha changes.
- **Major** (`0.x` to `1.0.0`) only when declaring the module stable for public use.

After `1.0.0`, use patch releases for backward-compatible fixes, minor releases for backward-compatible additions, and major releases for incompatible changes.

The following changes are breaking:

- Changing the module ID or a compendium pack name.
- Changing an existing compendium document `_id`.
- Renaming ancestry, heritage, feat, or trait slugs.
- Renaming settings, actor flags, shared exports, or hooks.
- Removing settings, packs, documents, or supported behavior.
- Raising the minimum supported Foundry VTT, PF2e system, or Library version.
- Changing stored data in a way that requires migration.

During early alpha, breaking changes increment the minor version and do not require migrations unless a release explicitly promises otherwise.

## Preparing a release

1. Update `CHANGELOG.md` for the intended version.
2. Choose exactly one version command:

    ```shell
    npm run release:patch
    npm run release:minor
    npm run release:major
    ```

3. Review the resulting changes and ensure `npm run check` passes.
4. Commit the release changes.
5. Create and push a `vX.Y.Z` tag matching the new version.
6. Publish the corresponding GitHub release to trigger the publish workflow.

The version command updates `package.json`, `package-lock.json`, `module.json.version`, and the versioned `module.json.download` URL. It deliberately does not create a commit or Git tag.
