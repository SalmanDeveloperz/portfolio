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

The form posts to [FormSubmit](https://formsubmit.co) (`formsubmit.co/ajax/farwaramzan734@gmail.com`), which emails every message straight to farwaramzan734@gmail.com. No account needed. The visitor's email is set as reply-to, so you can hit **Reply** in Gmail.

- Each email subject includes the sender's name and time, so Gmail never stacks them into one thread.
- First-time setup: FormSubmit sends an "Activate Form" email; click the link once.
- If messages stop arriving, check Gmail's Spam folder first.

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510. The contact form works locally as well.

---

© Farwa Ramzan. All rights reserved.
