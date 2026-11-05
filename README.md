# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V32

- Adds an Energy Shield to the Armory. Buy it with GP, activate it with right-click, and upgrade it through five levels that increase its duration.
- Adds 50 GP for each cleared round and raises direct GP Box rewards from 50 to 60 GP. Explosive GP Box rewards rise from 35 to 40 GP.

## Previous updates

- **V31 — High Scores status:** Changes the live status label to “Updated · Live.”
- **V30 — High Scores reliability:** Fixes JSONBin score loading when metadata is disabled, so the leaderboard reads and merges saved scores correctly after each completed mission. Shows the server error when a live read fails.
- **V29 — Round complete screen:** Adds Continue and Back to Main Menu choices after each mission, plus a Back to Main Menu button on medal screens.
- **V28 — Save scores when quitting:** Submits saved mission and defeat totals when quitting to title after making progress, as well as on mission completion and game over. Clarifies when a score is sent if the online leaderboard is empty.

High Scores use JSONBin with the restricted `X-Access-Key` configured in `leaderboard-config.js`. Host the repository with GitHub Pages and embed its `index.html` page in your site.

