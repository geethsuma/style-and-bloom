# Style & Bloom Decor – Website

Static party-decor website (no build step, no dependencies).

## Files
- `index.html` – page shell (header, footer, lightbox)
- `styles.css` – all styling
- `script.js` – **content configuration (top of file)** + page rendering/routing
- `assets/logo.png` – logo

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000

## Deploy (GitHub Pages)
Repo Settings → Pages → Deploy from branch → `main` / root.

## Editing content
Edit the `CONTENT CONFIGURATION` block at the top of `script.js`: packages, prices, services, backdrops, extras, FAQs, contact details.
Anything in [square brackets] is a placeholder; an empty price shows "Price to be confirmed".

## Enquiry form
Set `formEndpoint` in `script.js` to a form service URL (e.g. Formspree). Until set, the form does not claim to send anything.

## Photos
Gallery, package and backdrop images are placeholders (`ph()` helper in `script.js`). Replace with your real photos in `assets/`.
