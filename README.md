# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V7

- Adds six alternate projectiles to the Armory with permanent one-time unlocks and increased coin costs.
- Adds shrapnel fragments, cryo freeze, wide shockwave and cluster blasts, and rail rounds.
- Adds Settings for difficulty, tank handling, screen shake, and explosion particle density.
- Adds a High Scores screen with best level reached, shots fired, and tanks defeated.
- Stores scores locally on every device and supports shared JSONBin leaderboards using the CastleRangersV35 pattern.

### Connect a dedicated JSONBin

Create a new private JSONBin bin containing `{"scores":[]}`. In `leaderboard.js`, set `BIN_ID` to that new bin ID and `MASTER_KEY` to your JSONBin API master key. Use a dedicated bin for TankShot so neither game can overwrite the other's leaderboard. Until those two values are added, the High Scores screen uses its local device board.

The game retains automatic update checks through `version.json` and safe title-screen installation. Host the repository with GitHub Pages and embed its `index.html` page in your site.
