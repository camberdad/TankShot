# TankShot update workflow

## Canonical GitHub repository

- Repository: `camberdad/TankShot`
- Publish updates to the `main` branch. GitHub Pages serves the project from this repository.

## Every requested game update

1. Make the requested changes in the workspace and follow TankShot's existing versioning and archive conventions.
2. Update the root `version.json` and `version-check.js` version together when the game release changes.
3. Update the root `README.md` in the CastleRangers style: describe the release under `Latest update`, move the former latest release into `Previous updates`, and keep prior release notes intact.
4. Publish all changed project files together to `camberdad/TankShot` on `main` as one Git commit, with a message in the form `Release TankShot V<number> <short change summary>`.
5. If a local Git checkout or remote is unavailable, use the connected GitHub tools. Read the current `main` contents first, preserve unrelated remote changes, and update the branch only from the head SHA that was inspected. Do not leave the requested update only in the local workspace.
6. After publishing, verify the resulting commit and report the GitHub commit link and a concise summary to the user.

## GitHub release notes

Use the root README as the public update report, matching CastleRangers' `Latest update` and `Previous updates` sections. Keep the latest release summary short and user-facing. Mention rollbacks or corrections explicitly when applicable.

