# TankShot

TankShot is a browser tank game built with HTML, CSS, and JavaScript.

## Latest update — V6

- Automatically checks `version.json` every 30 seconds, following the CastleRangers update flow.
- Shows an update-ready notice during play and installs the update automatically at the title screen.
- Refreshes with a cache-busted version URL and progress notice.
- Includes persistent coins, coin crates, an Armory, and unlockable ammo types from V5.

## Play locally

Open `index.html` in a modern browser. No build step or package installation is required. The automatic version check runs on the hosted site; browsers restrict local-file requests.

## Play online

https://camberdad.github.io/TankShot/

## Embed on a website

TankShot uses the same centered 16:9 viewport sizing as CastleRangers V35:

```html
<iframe
  src="https://camberdad.github.io/TankShot/"
  title="TankShot"
  width="1280"
  height="720"
  style="width:100%; height:auto; aspect-ratio:16 / 9; border:0; display:block;"
  allow="fullscreen"
</iframe>
```

## Controls

- Move with **WASD** or **arrow keys**.
- Aim with the mouse; click or press **Space** to fire.
- Press **Q** to cycle unlocked ammo.
- Use **E**, **Shift**, or right click to place a mine.
- Press **P** or **Esc** to pause.
