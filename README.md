# TankShot

TankShot is a self-contained browser tank game built with HTML, CSS, and JavaScript.

## Play locally

Open `index.html` in a modern browser. No build step or package installation is required.

## Play online

The game is published from the root of the `main` branch using GitHub Pages:

https://camberdad.github.io/TankShot/

## Embed on a website

TankShot uses the same centered 16:9 viewport sizing as CastleRangers V35. Give the iframe a 16:9 size; it will scale to the width of its container:

```html
<iframe
  src="https://camberdad.github.io/TankShot/"
  title="TankShot"
  width="1280"
  height="720"
  style="width:100%; height:auto; aspect-ratio:16 / 9; border:0; display:block;"
  allow="fullscreen"
></iframe>
```

## Controls

- Move with **WASD** or **arrow keys**.
- Aim with the mouse and hold/click to fire.
- Use **E** or **Shift** to place a mine.
- Press **P** or **Esc** to pause.
