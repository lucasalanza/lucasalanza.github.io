# lucasalanza.github.io

Personal portfolio site — published via GitHub Pages at [lucasalanza.github.io](https://lucasalanza.github.io/).

## Stack

Static HTML5/CSS/JS, Bootstrap 5, based on the [BootstrapMade "iPortfolio"](https://bootstrapmade.com/) template. No build step — GitHub Pages serves the repository directly.

## Structure

```
index.html                    → main page (hero, about, skills, resume, portfolio)
EuNunca-Privacy.html          → privacy policy for the "Eu Nunca" app (linked from Play Store)
OConselheiro-Privacy.html     → privacy policy for "The Advisor" app (linked from Play Store)
docs/                         → résumé and article PDFs
assets/                       → CSS, JS, images, vendored libraries
```

## Local preview

No build tooling required — open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```bash
npx serve .
```

## Deploy

Pushing to `main` publishes automatically via GitHub Pages.
