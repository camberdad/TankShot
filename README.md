# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V31

- Changes the High Scores live status label to “Updated · Live.”

## Previous updates

- **V30 — High Scores reliability:** Fixes JSONBin score loading when metadata is disabled, so the leaderboard reads and merges saved scores correctly after each completed mission. Shows the server error when a live read fails.
- **V29 — Round complete screen:** Adds Continue and Back to Main Menu choices after each mission, plus a Back to Main Menu button on medal screens.
- **V28 — Save scores when quitting:** Submits saved mission and defeat totals when quitting to title after making progress, as well as on mission completion and game over. Clarifies when a score is sent if the online leaderboard is empty.

High Scores use JSONBin with the restricted `X-Access-Key` configured in `leaderboard-config.js`. Host the repository with GitHub Pages and embed its `index.html` page in your site.

