# Content management guide

Everything visible on the public site is editable through Filament at `/admin`. This document walks through the order in which to populate content for an actual launch.

## Order of operations

### 1. Site Settings (`Configuration → Site Settings`)

Replace these first — they appear on every page:

- **Branding tab** — upload logo, dark logo, favicon; set Site name and Tagline (EN + AR).
- **Hero tab** — upload hero image; set Hero title, subtitle, and CTA text (EN + AR).
- **About tab** — short company description (EN + AR) used in About page header and footer.
- **Contact tab** — phone(s), email(s), address (EN + AR), working hours (EN + AR), Google Maps embed `src` URL.
- **Social tab** — Facebook, LinkedIn, Instagram, X, YouTube URLs.

### 2. Services (`Content → Services`)

Six placeholder services are seeded:

1. Network Infrastructure
2. Cybersecurity
3. Cloud Solutions
4. Data Center Solutions
5. Managed IT Services
6. IT Consulting

For each one:

- Replace title, short description, full description, and features with the client's actual content (EN + AR).
- Upload a service-specific image.
- Set `is_featured = true` for the top 3 services to appear on the homepage.

### 3. Solutions (`Content → Solutions`)

Four placeholder industry solutions are seeded (Banking, Healthcare, Education, Government). Same workflow as Services.

### 4. Projects (`Content → Projects`)

Three placeholder project entries are seeded with `slug = placeholder-project-1/2/3`. For each completed project the client wants to feature:

- Edit the placeholder OR delete it and create a new project.
- Set title, client name, industry, summary, challenge, solution, results (all bilingual).
- Upload cover image and gallery images.
- Set `is_featured = true` for projects to appear on the homepage.

### 5. Partners (`Content → Partners`)

Six partner names are seeded with placeholder logos. For each:

- Upload the actual vendor logo (transparent PNG or SVG works best).
- Set the partner website URL.

If the client has more partners, add them — the admin supports unlimited.

### 6. Team (`Content → Team Members`)

Three placeholder team members are seeded. For each:

- Upload photo.
- Set name, position, and short bio (bilingual).
- Add LinkedIn URL and email if available.

### 7. Blog Posts (`Content → Blog Posts`)

Two placeholder posts are seeded. To publish a real post:

- Title, excerpt, content (use the rich editor for formatting).
- Cover image.
- Category (e.g. Cybersecurity, Cloud, Networking).
- Set `published_at` to the date you want the post to appear (posts with future dates are hidden until that date).

### 8. Contact submissions (`Inbox → Contact Submissions`)

This is where form submissions from the public site land. The navigation badge shows the count of unread submissions. Opening a submission marks it as read on save.

## Bilingual editing tips

- Every translatable field has two inputs side-by-side: English on the left, Arabic on the right (with RTL direction).
- Both languages are required where marked. If you save with one missing, the field will display in whichever language is available with no fallback to the other.
- The frontend automatically picks the active language. There's no separate "translation" step — write the content once in each language in the admin and it's live.

## Image guidelines

| Field                   | Recommended size          | Format        |
| ----------------------- | ------------------------- | ------------- |
| Logo (header)           | 200×80, transparent       | PNG or SVG    |
| Logo dark (footer)      | 200×80, white on transparent | PNG or SVG |
| Favicon                 | 256×256                   | PNG or SVG    |
| Hero image              | 1920×1080                 | JPEG          |
| Service / Solution image | 800×600                   | JPEG          |
| Project cover image     | 1600×1200                 | JPEG          |
| Project gallery         | 1600×1200 each            | JPEG          |
| Partner logo            | 400×200, transparent      | PNG or SVG    |
| Team photo              | 400×400, square           | JPEG          |
| Blog cover image        | 1600×900                  | JPEG          |

Filament has a built-in image editor (crop, rotate, resize) that opens automatically on upload.

## SEO

Each Service has Meta Title and Meta Description fields under the SEO section. Set them in both languages. The frontend wires these into `<title>` and `<meta>` via `react-helmet-async`.

## Pricing / availability of admin features

All Filament features in this build are using the open-source plan — no paid plugins required.
