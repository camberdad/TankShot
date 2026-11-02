# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V11

- Adds 30, 60, 120, and Unlimited FPS choices in Settings.
- Runs physics at a fixed 120 Hz simulation step and caps drawing independently, keeping movement and collision timing consistent across frame-rate options.
- Limits catch-up work after browser stalls to avoid sudden simulation bursts.
- Retains the V10 startup and briefing fixes.

The local Documents build is configured for the dedicated TankShot JSONBin. The public GitHub Pages build omits the master key and uses its per-device score fallback. A secure serverless relay is required for shared scores on the public site.

Host the repository with GitHub Pages and embed its `index.html` page in your site.
