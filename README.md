# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V9

- Connects the High Scores screen directly to the dedicated TankShot JSONBin.
- Shows best level reached, shots fired, and tanks defeated, with a local fallback if the service is unreachable.
- Adds five new projectile types (eight alternate types total) with permanent one-time unlocks and increased coin costs.
- Adds shrapnel fragments, cryo freeze, wide shockwave and cluster blasts, and rail rounds.
- Adds Settings for difficulty, tank handling, screen shake, and explosion particle density.
- Checks for game updates through `version.json` and safely installs at the title screen.

The JSONBin master key is included in `leaderboard-config.js` for direct browser access, as requested. Host this repository with GitHub Pages and embed its `index.html` page in your site.
