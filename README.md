# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V21

- Restores the High Scores screen and records each player's best mission and total tanks defeated.
- Uses the JSONBin V3 read and update endpoints with an `X-Access-Key` header; the Master Key is no longer used in the game client.
- Live scores require a restricted JSONBin Access Key with read and update permissions. Add it to `leaderboard-config.js` as `ACCESS_KEY` to enable online scores; until then the game shows device-local scores.

High Scores use JSONBin bin `6ae7dc15ac6210605a64856b`. The repository is hosted with GitHub Pages and can be embedded using its `index.html` page.

