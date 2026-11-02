# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V14

- Adds 30, 60, 120, and Unlimited FPS choices in Settings.
- Runs physics at a fixed 120 Hz simulation step and caps drawing independently, keeping movement and collision timing consistent across frame-rate options.
- Limits catch-up work after browser stalls to avoid sudden simulation bursts.
- Smooths screen shake so it does not turn into rapid random jitter at high render rates.
- Retains the V10 startup and briefing fixes.

The local Documents build is configured for the TankShot JSONBin. The public GitHub Pages build keeps its config blank; automatic review blocked publishing the Master Key in public client code. Shared online scores on GitHub Pages require a server-side relay.

Host the repository with GitHub Pages and embed its `index.html` page in your site.
- Displays the saved highest mission completed and lifetime enemy tank defeats in the HUD.
- Shows a compact V12 version label on screen.
- Sends lifetime mission and defeat totals to the high scores after each completed mission, retaining legacy JSONBin field compatibility.

- Publishes the JSONBin client configuration using the CastleRangersV35 setup.

- Fixes player movement by restoring the missing steering target and turn step.
- Restores direct tank damage on standard and piercing projectile hits.
- Runs simulation at a fixed 60 Hz to reduce CPU load while retaining render FPS settings.
- Removes the Armory permanent label and describes the one-time unlock.

