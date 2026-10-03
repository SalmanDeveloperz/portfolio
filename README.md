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

The form posts to a Google Form (`formResponse` URL in `index.html`). Answers land in that form's **Responses** tab in Google Forms. To get them by email, open the form and go to Responses → ⋮ → *Get email notifications for new responses*.

Field mapping (if the form is ever replaced, update these `name` attributes):

| Site field | Google Form entry |
| --- | --- |
| Name | `entry.551793403` |
| Email | `entry.129362744` |
| Message | `entry.1755130640` |
| (required checkbox, sent automatically) | `entry.274318874` = `Option 1` |

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510. The contact form works locally as well.

---

© Farwa Ramzan. All rights reserved.
