# Benhaven Emergency Services

Public website for Benhaven Emergency Services (Benhaven Fire/Rescue), also known as Lucky 13. Static HTML, CSS, and JavaScript for GitHub Pages.

Live site: https://elmacho77.github.io/benhaven/

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

### Emergency banner and burn ban

Both are off until someone turns them on.

- Set `emergencyBanner.active` to `true` and write a plain-text `message` for a red notice on every page.
- Set `burnBan.active` to `true` and edit the message for a gold burn-ban notice. The same switch drives Home, Burn Permits, and Alerts.
- Set `active` back to `false` when the notice ends.
- Do not put patient details, private addresses, or member names in a banner.

Publish the change on the `main` branch. GitHub Pages updates from that branch.

### Logo

The header mark is `assets/images/mark.svg`. The favicon is `assets/favicon.svg`, with PNG copies in `assets/icons/`. Replace those files when the department provides an official logo. Keep the department name as text beside the mark.

### Formspree

The contact form and the join form look like forms today. Until a real Formspree endpoint is saved, submitting one opens the visitor’s email app, addressed to benhavenfire@charter.net.

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

- Official logo file
- Permission to publish leadership, board, or member names and photos
- A current Station 3 photograph, and department-owned photos to replace the Station 1 and Station 2 reference images
- Confirmation that benhavenfire@charter.net still reaches the department
- Formspree form ID or IDs
- News the department wants posted, and any incident summaries (no patient or caller details)
- Current apparatus list and photos
- Paid job openings, if any, and the real requirements for volunteers
- Whether Station 1 should show a separate phone. An older page listed 919-499-9611. This site uses 919-499-9511 for every station, as directed
- The current way to request a burn permit, and the wording for any active burn ban
- Whether the older training rhythm (fire training on the second Monday, general meeting on the fourth Tuesday, EMS continuing education on varying dates) is still accurate
- CPR or class dates
- A coverage map, if one should be published
- Mutual-aid partners, if they should be named

Staffing totals and insurance ratings are omitted on purpose. They were not confirmed.
