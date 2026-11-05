# Benhaven Emergency Services

Public website for Benhaven Emergency Services (Benhaven Fire/Rescue), also known as Lucky 13. Static HTML, CSS, and JavaScript for GitHub Pages.

Intended address: https://elmacho77.github.io/benhaven/

The site is on the `main` branch. GitHub Pages has to be switched on once by someone who can administer the repository. The credential used to publish this commit cannot change that setting (the Pages API returned 403).

1. Open https://github.com/elmacho77/benhaven/settings/pages
2. Under Build and deployment, choose **Deploy from a branch**.
3. Branch: **main**. Folder: **/ (root)**. Save.

The first deploy usually appears at the address above within a few minutes. Leave the source on `main` and `/` so later pushes publish themselves.

In an emergency, dial 911. The non-emergency phone for every station is 919-499-9511.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

The custom 404 page uses `/benhaven/` links so it matches GitHub Pages. The other pages use relative links and work from a local server at the site root.

## What to edit

Phones, banners, and forms are in `assets/js/config.js`. The same phone numbers are also written in the HTML so they still show if JavaScript is off. Change both places if a number changes.

### Announcement strip, emergency banner, and burn ban

These notes are for the person updating the site. The public Alerts page does not mention this file.

The header strip is on for the annual board meeting and links to `news-annual-board-meeting-2026.html`. After November 16, 2026, set `announcement.active` to `false` in `assets/js/config.js`, and change the sentence in each page’s announcement strip so it still reads correctly if JavaScript is off.

- **Public announcement.** Set `announcement.active` to `true` and write `message`. It appears in the dark strip at the top of every page. `href` is the page the strip links to.
- **Emergency banner.** Set `emergencyBanner.active` to `true` and write a plain-text `message`. The banner is red and shows on every page.
- **Burn-ban banner.** Set `burnBan.active` to `true` and edit the message. The banner is dark grey with a red stripe. The same switch drives Home, Burn Permits, and Alerts.
- Set `active` back to `false` when the notice ends.
- Do not put patient details, private addresses, or member names in a banner.

Publish the change on the `main` branch. GitHub Pages updates from that branch.

### Logo

The header uses the department logo at `assets/images/logo.png`. Favicon sizes are in `assets/icons/`. Replace those files if a new logo file is issued. The department name stays as text beside the mark.

### Formspree

The contact form and the join form look like forms today. Until a real Formspree endpoint is saved, submitting one opens the visitor’s email app, addressed to info@bes13.com.

Herschel, to turn on online delivery:

1. Create a free account at https://formspree.io using the inbox that should receive messages.
2. Create a form named “Benhaven contact”. Copy the endpoint. It looks like `https://formspree.io/f/abcdwxyz`. The last part is the form ID.
3. Create a second form named “Benhaven join”, or reuse the same endpoint for both.
4. Open `assets/js/config.js`. Replace `https://formspree.io/f/YOUR_FORM_ID` for `formspree.contact` and `formspree.join`.
5. Commit and push to `main`.
6. Send a test message. Formspree may ask you to confirm the first submission from a new site.
7. The form text changes automatically once the placeholder ID is gone. Emergencies still belong on 911.

## Pages

- Home
- About
- Services
- Stations and apparatus
- People (titles only)
- Community education
- Join Us
- News and three starter notes
- Contact
- Burn permits
- Alerts
- Privacy
- Accessibility
- Branded 404

## Still needed from the department

Do not invent these. Leave the “coming soon” wording until they are confirmed.

- Any social accounts besides the department Facebook and Instagram pages
- County, mutual-aid, and partner links for the footer
- Permission to publish leadership, board, or member names and photos
- A current Station 3 photograph, and department-owned photos to replace the Station 1 and Station 2 reference images
- Formspree form ID or IDs
- News the department wants posted, and any incident summaries (no patient or caller details)
- Current apparatus list and photos
- Paid job openings, if any, and the real requirements for volunteers
- Whether Station 1 should show a separate phone. An older page listed 919-499-9611. This site uses 919-499-9511 for every station, as directed
- The wording for any active burn ban
- Whether the older training rhythm (fire training on the second Monday, general meeting on the fourth Tuesday, EMS continuing education on varying dates) is still accurate
- CPR or class dates
- A coverage map, if one should be published
- Mutual-aid partners, if they should be named

Staffing totals and insurance ratings are omitted on purpose. They were not confirmed.
