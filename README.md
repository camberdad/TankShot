# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V10

- Fixes game startup: the Settings and High Scores controls now exist in the title menu, and the missing best-run display is restored.
- Prevents missing optional menu controls from stopping the animation loop.
- Makes the mission briefing start immediately on click or Enter, with the countdown as a fallback.
- Keeps the V9 projectile unlocks, effects, settings, high scores, and version checker.

The local Documents build is configured for the dedicated TankShot JSONBin. The public GitHub Pages build omits the master key and uses its per-device score fallback. A secure serverless relay is required for shared scores on the public site.

Host the repository with GitHub Pages and embed its `index.html` page in your site.
