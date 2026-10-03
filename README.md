# Farwa Ramzan — Portfolio

Personal site of **Farwa Ramzan**, Senior QA Engineer & QA Team Lead (Lahore, Pakistan).

Live: https://farich.netlify.app/

## Stack

Plain HTML, CSS and a small vanilla JS file, with light and dark themes. No build step and no dependencies apart from Google Fonts (Geist / Geist Mono).

| File | Purpose |
| --- | --- |
| `index.html` | All page content |
| `style.css` | Styles (light & dark themes, responsive) |
| `main.js` | Theme switch, mobile menu, scroll reveal, contact form |
| `Farwa_Ramzan_Resume.pdf` | CV served by the "Download CV" buttons |

## Updating

- **CV**: replace `Farwa_Ramzan_Resume.pdf` with the new file (keep the same name).
- **Experience / skills / projects**: edit the matching section in `index.html`.

## Contact form

The form posts to [Formspree](https://formspree.io) (`https://formspree.io/f/myzyyepe`), which emails every message to the Formspree account's address (farwaramzan734@gmail.com). Visitors' email is set as reply-to, so you can just hit **Reply** in Gmail.

- Submissions are also listed in the Formspree dashboard.
- Free plan: 50 submissions/month.
- If messages stop arriving, check Gmail's Spam folder and the Formspree dashboard first.

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510. The contact form works locally as well.

---

© Farwa Ramzan. All rights reserved.
