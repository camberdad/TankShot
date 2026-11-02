# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V8

- The local Documents build connects to the dedicated TankShot JSONBin and keeps a local fallback.
- High Scores records the best level reached, shots fired, and tanks defeated.
- Adds five new projectile types (eight alternate types total) with permanent one-time unlocks and increased coin costs.
- Adds shrapnel fragments, cryo freeze, wide shockwave and cluster blasts, and rail rounds.
- Adds Settings for difficulty, tank handling, screen shake, and explosion particle density.
- Checks for game updates through `version.json` and safely installs at the title screen.

`leaderboard-config.js` contains the JSONBin master key. Keep it out of public GitHub. GitHub Pages needs a secure serverless relay with the key stored server-side to enable shared scores; without that file, the hosted game safely uses its per-device fallback.

Host the repository with GitHub Pages and embed its `index.html` page in your site.
