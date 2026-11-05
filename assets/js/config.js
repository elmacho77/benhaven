/* Benhaven Emergency Services — site configuration
   This is the one file for phones, banners, and forms.
   Phone numbers are also written in the HTML so they show with JavaScript off.
   If you change a number here, update the HTML to match.

   Banners are off until active is set to true. Write plain text only.
   Do not put private information, patient details, or member names in a banner.
*/
window.SITE_CONFIG = {
  name: "Benhaven Emergency Services",
  shortName: "Benhaven Fire/Rescue",
  tagline: "In Service to Our Community Since 1982",
  motto: "Lucky 13",
  phones: {
    emergencyDisplay: "911",
    emergencyTel: "911",
    nonEmergencyDisplay: "919-499-9511",
    nonEmergencyTel: "+19194999511",
    faxDisplay: "919-498-0188",
    faxTel: "+19194980188"
  },
  email: "info@bes13.com",
  mailingAddress: {
    line1: "P.O. Box 301",
    line2: "Olivia, NC 28368"
  },
  /* Header announcement strip. Set active to false when the notice ends. */
  announcement: {
    active: true,
    title: "Public announcement",
    message: "Annual Board Meeting November 16, 2026 @ 7pm at Station 3."
  },
  /* Red banner on every page. Leave active false until there is a real notice. */
  emergencyBanner: {
    active: false,
    title: "Public notice",
    message: ""
  },
  /* Gold burn-ban banner. The same switch drives Home, Burn Permits, and Alerts.
     Set active to true and edit the message when a ban applies. Set it back to
     false when the ban ends. */
  burnBan: {
    active: false,
    title: "Burn ban in effect",
    message: "Open burning is suspended until this notice is removed. Call 919-499-9511 with questions. A permit does not override a burn ban."
  },
  /* Formspree
     1. Create a form at https://formspree.io
     2. Copy the endpoint. It looks like https://formspree.io/f/abcdwxyz
     3. Paste it below. contact and join can share one endpoint or use two.
     Leave YOUR_FORM_ID in place until then. The form will open the visitor’s
     email app instead of delivering online. */
  formspree: {
    contact: "https://formspree.io/f/YOUR_FORM_ID",
    join: "https://formspree.io/f/YOUR_FORM_ID"
  }
};
