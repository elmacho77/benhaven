(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  function clean(value) {
    return value == null ? "" : String(value).trim();
  }

  function makeBanner(title, message, kind) {
    var el = document.createElement("div");
    el.className = "banner banner--" + kind;
    el.setAttribute("role", kind === "emergency" ? "alert" : "status");
    var p = document.createElement("p");
    p.className = "wrap";
    var strong = document.createElement("strong");
    strong.textContent = title;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(" " + message));
    el.appendChild(p);
    return el;
  }

  var host = document.getElementById("site-banners");
  var active = [];
  var announce = document.getElementById("announce-default");
  if (announce && cfg.announcement && cfg.announcement.active && clean(cfg.announcement.message)) {
    announce.replaceChildren();
    var announceText = document.createElement("p");
    announceText.className = "wrap";
    var announceHref = announce.getAttribute("data-announce-href") || cfg.announcement.href || "";
    if (announceHref) {
      var announceLink = document.createElement("a");
      announceLink.href = announceHref;
      announceLink.textContent = clean(cfg.announcement.message);
      announceText.appendChild(announceLink);
    } else {
      announceText.textContent = clean(cfg.announcement.message);
    }
    announce.appendChild(announceText);
    active.push("announcement");
  }
  if (host && cfg.emergencyBanner && cfg.emergencyBanner.active) {
    var emergencyMessage = clean(cfg.emergencyBanner.message);
    if (emergencyMessage) {
      host.appendChild(makeBanner(clean(cfg.emergencyBanner.title) || "Public notice", emergencyMessage, "emergency"));
      active.push("emergency");
    }
  }
  if (host && cfg.burnBan && cfg.burnBan.active) {
    var burnMessage = clean(cfg.burnBan.message);
    if (burnMessage) {
      host.appendChild(makeBanner(clean(cfg.burnBan.title) || "Burn ban in effect", burnMessage, "burn"));
      active.push("burn");
    }
  }

  var quiet = document.getElementById("announce-default");
  var bannerOnly = active.indexOf("announcement") === -1 && (active.indexOf("emergency") !== -1 || active.indexOf("burn") !== -1);
  if (quiet && bannerOnly) quiet.hidden = true;

  var stateTitle = document.getElementById("alerts-state-title");
  var stateCopy = document.getElementById("alerts-state-copy");
  if (stateTitle && stateCopy && active.length) {
    stateTitle.textContent = "A notice is posted";
    stateCopy.textContent = "Read the banner at the top of this page. That banner is the department’s current website alert.";
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var label = toggle ? toggle.querySelector(".nav-toggle-label") : null;

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Close" : "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setMenu(false);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function endpointReady(url) {
    return typeof url === "string" && /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(url) && url.indexOf("YOUR_FORM_ID") === -1;
  }

  var formMeta = {
    contact: {
      key: "contact",
      subject: "Website message for Benhaven Emergency Services",
      ready: "This form is delivered to the department."
    },
    join: {
      key: "join",
      subject: "Join Benhaven Emergency Services",
      ready: "This form is delivered to the department."
    }
  };

  var email = clean(cfg.email) || "info@bes13.com";

  document.querySelectorAll("form.js-form").forEach(function (form) {
    var meta = formMeta[form.getAttribute("data-form")];
    if (!meta) return;
    var endpoint = cfg.formspree && cfg.formspree[meta.key];
    var ready = endpointReady(endpoint);
    var mode = form.querySelector(".form-mode");
    if (mode && ready) {
      mode.textContent = meta.ready + " For emergencies, dial 911. Do not include medical details or identity documents.";
    }

    var phone = form.querySelector('input[type="tel"]');
    if (phone) {
      var checkPhone = function () {
        var digits = phone.value.replace(/\D/g, "");
        phone.setCustomValidity(phone.value && digits.length < 10 ? "Enter a 10-digit phone number, including the area code." : "");
      };
      phone.addEventListener("input", checkPhone);
      phone.addEventListener("change", checkPhone);
    }

    form.addEventListener("submit", function (event) {
      var trap = form.querySelector('[name="_gotcha"]');
      var status = form.querySelector(".form-status");
      if (trap && trap.value) {
        event.preventDefault();
        if (status) status.textContent = "Thank you. If this is an emergency, dial 911.";
        return;
      }
      if (!form.checkValidity()) return;
      event.preventDefault();

      if (ready) {
        var button = form.querySelector('[type="submit"]');
        if (button) button.disabled = true;
        var data = new FormData(form);
        fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        }).then(function (response) {
          if (!response.ok) throw new Error("Form request failed");
          form.reset();
          if (status) {
            status.textContent = "Thank you. Your message was sent. If you need emergency help, dial 911.";
            status.focus();
          }
        }).catch(function () {
          if (status) {
            status.textContent = "The form could not be sent. Call 919-499-9511 or email " + email + ".";
            status.focus();
          }
        }).then(function () {
          if (button) button.disabled = false;
        });
        return;
      }

      var lines = [];
      new FormData(form).forEach(function (value, key) {
        if (key === "_gotcha" || key === "_subject") return;
        lines.push(key.split("_").join(" ") + ": " + value);
      });
      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(meta.subject) + "&body=" + encodeURIComponent(lines.join("\n\n"));
      if (status) {
        status.textContent = "Your email app should open with this message. If nothing opens, call 919-499-9511 or email " + email + ".";
        status.focus();
      }
    });
  });
})();
