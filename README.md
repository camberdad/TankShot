# TankShot

TankShot is a self-contained browser tank game built with HTML, CSS, and JavaScript.

## Play locally

Open `index.html` in a modern web browser. No build step or package installation is required.

## Play online

The game is published from the root of the `main` branch using GitHub Pages:

https://camberdad.github.io/TankShot/

If GitHub Pages has not started serving the site yet, open **Settings → Pages** and select **Deploy from a branch**, branch `main`, folder `/ (root)`.

## Embed on a website

Use an iframe pointing to the published page:

```html
<iframe
  src="https://camberdad.github.io/TankShot/"
  title="TankShot"
  width="100%"
  height="720"
  style="border:0; display:block;"
  allow="fullscreen"
></iframe>
```

Adjust the height to fit the page layout. The game adapts to the iframe width and supports touch controls on phones and tablets.

## Controls

- Move with **WASD** or **arrow keys**.
- Aim with the mouse and hold/click to fire.
- Use **E** or **Shift** to place a mine.
- Press **P** or **Esc** to pause.
