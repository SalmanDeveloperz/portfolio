# Farwa Ramzan — Portfolio

Personal site of **Farwa Ramzan**, Senior QA Engineer & QA Team Lead (Lahore, Pakistan).

Live: https://farich.netlify.app/

## Stack

Plain HTML, CSS and a small vanilla JS file. No build step and no dependencies apart from Google Fonts (Geist / Geist Mono).

| File | Purpose |
| --- | --- |
| `index.html` | All page content |
| `style.css` | Styles (dark theme, responsive) |
| `main.js` | Header state, mobile menu, scroll reveal, contact form |
| `thanks.html` | Fallback confirmation page for the contact form |
| `Farwa_Ramzan_Resume.pdf` | CV served by the "Download CV" buttons |

## Updating

- **CV**: replace `Farwa_Ramzan_Resume.pdf` with the new file (keep the same name).
- **Experience / skills / projects**: edit the matching section in `index.html`.

## Contact form

The form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). Submissions appear in the Netlify dashboard under **Forms → contact**. Turn on email notifications there to receive them in your inbox.

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510. The contact form only delivers messages once the site is deployed on Netlify.

---

© Farwa Ramzan. All rights reserved.
