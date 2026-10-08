/* =========================================================
   WALVIS CONCIERGE · js/main.js
   ---------------------------------------------------------
   What this file does, in order:
   1. Builds the header and menu (edit the menu in MENU below).
   2. Builds the footer and the floating WhatsApp button.
   3. Builds the catalogues (Travel, Experiences, Retail,
      Personal Life) from js/data.js, with filters and sorting.
   4. Builds the home-page carousels and the item detail page.
   5. Turns every data-wa="..." element into a WhatsApp link.
   6. Handles tabs, the dropdown, the mobile menu and the
      gentle fade-in as you scroll.

   Contact details, prices and listings are NOT edited here.
   They live in js/data.js.
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var page = document.body.getAttribute("data-page") || "";

  /* ---------------------------------------------------------
     1. THE MENU · edit links here, once, for every page.
     --------------------------------------------------------- */
  var MENU = {
    // First item in the menu: the overview page
    overview: { id: "what-we-do", label: "What We Do", href: "what-we-do.html" },
    membership: [
      { id: "personal", label: "Personal Concierge", href: "personal-concierge.html" },
      { id: "corporate", label: "Corporate Concierge", href: "corporate-concierge.html" }
    ],
    // Shown as its own menu item, next to Membership
    foreigners: { id: "foreigners", label: "Visitors and Expats", href: "foreigners-concierge.html" },
    areas: [
      { id: "travel", label: "Travel", href: "travel.html" },
      { id: "retail", label: "Retail", href: "retail.html" },
      { id: "experiences", label: "Experiences", href: "experiences.html" },
      { id: "personal-life", label: "Personal Life", href: "personal-life.html" },
      { id: "special-requests", label: "Special Requests", href: "special-requests.html" }
    ],
    company: [
      { id: "about", label: "About", href: "about.html" },
      { id: "contact", label: "Contact", href: "contact.html" }
    ]
  };

  /* ---------------------------------------------------------
     THE PROMISE · the core line of the whole site.
     Edit it here once; it appears in the statement band
     (<div data-promise></div>) on every page that has one,
     and in the footer.
     --------------------------------------------------------- */
  var PROMISE = {
    line: "If it\u2019s legal, we can do it.",
    honest: "We give every request a real effort, and tell you early if something cannot be done.",
    rules: ["Two or three options within 24 hours for special requests", "Nothing bought or booked without your yes"]
  };

  // The default WhatsApp message used by the header, footer and floating button.
  // A page can set its own with <body data-wa-message="...">.
  var DEFAULT_MESSAGE = document.body.getAttribute("data-wa-message") || "Hello Walvis, I would like to make an enquiry.";

  /* ---------- Small helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(message) {
    return "https://wa.me/" + WALVIS.whatsapp + "?text=" + encodeURIComponent(message);
  }
  function telLink(phone) { return "tel:" + phone.replace(/[^+\d]/g, ""); }
  function each(selector, fn, root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(selector), fn);
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function navLink(item, extraClass) {
    var active = item.id === page;
    return '<a href="' + item.href + '" class="' + (extraClass || "") + (active ? " is-active" : "") + '"' +
      (active ? ' aria-current="page"' : "") + ">" + item.label + "</a>";
  }
  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  // Prices: 38000 -> "৳ 38,000" (South Asian digit grouping, e.g. 1,20,000)
  function money(n) { return WALVIS.currency + " " + Number(n).toLocaleString("en-IN"); }
  function priceHTML(item) {
    if (item.priceText) return '<span class="price">' + esc(item.priceText) + "</span>";
    if (!item.price) return '<span class="price price--ask">Price on request</span>';
    var from = item.priceNote === "from";
    var note = item.priceNote && !from ? ' <small>' + esc(item.priceNote) + "</small>" : "";
    return '<span class="price">' + (from ? "<small>From</small> " : "") + money(item.price) + note + "</span>";
  }
  function availabilityHTML(item) {
    return item.availability ? '<span class="availability">' + esc(item.availability) + "</span>" : "";
  }
  function itemURL(key, item) { return "item.html?c=" + key + "&id=" + encodeURIComponent(item.id); }
  function requestMessage(cat, item) {
    return 'Hello Walvis, I would like to know more about "' + item.title + '" (' + cat.name + ")" +
      (cat.showPrice && item.price ? ", listed at " + money(item.price) : "") + ".";
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     LOGO · the round seal + the WALVIS / CONCIERGE wordmark.
     The seal image is set in js/data.js (logo).
     --------------------------------------------------------- */
  function brandMarkup() {
    return '<a class="brand" href="index.html" aria-label="Walvis Concierge, home">' +
      '<img class="seal" src="' + esc(WALVIS.logo) + '" alt="" width="48" height="48">' +
      '<span class="wordmark" aria-hidden="true"><span class="wm-name">Walvis</span><span class="wm-rule"></span><span class="wm-sub">Concierge</span></span>' +
    "</a>";
  }

  /* ---------------------------------------------------------
     2. HEADER
     --------------------------------------------------------- */
  var memberActive = MENU.membership.some(function (m) { return m.id === page; });
  var headerSlot = document.getElementById("site-header");
  if (headerSlot) {
    headerSlot.outerHTML =
      '<header class="site-header" id="header"><div class="header-inner">' +
        brandMarkup() +
        '<nav class="nav" id="nav" aria-label="Main">' +
          '<ul class="nav-list">' +
            "<li>" + navLink(MENU.overview, "nav-link") + "</li>" +
            '<li class="has-drop">' +
              '<button class="nav-link drop-toggle' + (memberActive ? " is-active" : "") + '" type="button" aria-expanded="false" aria-controls="drop-membership">' +
                'Membership<svg class="caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>' +
              "</button>" +
              '<ul class="drop" id="drop-membership">' +
                MENU.membership.map(function (m) { return "<li>" + navLink(m) + "</li>"; }).join("") +
              "</ul>" +
            "</li>" +
            [MENU.foreigners].concat(MENU.areas, MENU.company).map(function (m) { return "<li>" + navLink(m, "nav-link") + "</li>"; }).join("") +
          "</ul>" +
          '<a class="btn btn--small nav-cta" data-wa="' + esc(DEFAULT_MESSAGE) + '">Enquire</a>' +
          '<div class="drawer-foot">' +
            '<p class="drawer-tag">From seas to mountains, consider it done.</p>' +
            '<a href="' + telLink(WALVIS.phone) + '">' + esc(WALVIS.phone) + "</a>" +
            '<a href="mailto:' + esc(WALVIS.email) + '">' + esc(WALVIS.email) + "</a>" +
          "</div>" +
        "</nav>" +
        '<button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span></button>' +
      "</div></header>";
  }

  /* ---------------------------------------------------------
     3. FOOTER + floating WhatsApp button
     --------------------------------------------------------- */
  function footerColumn(title, items) {
    return '<div class="footer-col"><h2 class="footer-head">' + title + "</h2><ul>" +
      items.map(function (m) { return "<li>" + navLink(m) + "</li>"; }).join("") + "</ul></div>";
  }
  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) {
    var socialLinks = Object.keys(WALVIS.social || {}).map(function (name) {
      return '<li><a href="' + esc(WALVIS.social[name]) + '" rel="noopener">' + esc(name) + "</a></li>";
    }).join("");
    footerSlot.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' + brandMarkup() +
            '<p class="footer-strap">' + PROMISE.line + "</p>" +
            '<p class="footer-line">From seas to mountains, <em>consider it done.</em></p>' +
            '<p class="footer-small">A private lifestyle concierge, started in Dhaka. Membership is limited and by enquiry.</p>' +
          "</div>" +
          footerColumn("Membership &amp; services", MENU.membership.concat([MENU.foreigners])) +
          footerColumn("What we do", [MENU.overview].concat(MENU.areas)) +
          '<div class="footer-col"><h2 class="footer-head">Reach us</h2><ul>' +
            '<li><a data-wa="' + esc(DEFAULT_MESSAGE) + '">WhatsApp</a></li>' +
            '<li><a href="' + telLink(WALVIS.phone) + '">' + esc(WALVIS.phone) + "</a></li>" +
            '<li><a href="mailto:' + esc(WALVIS.email) + '">' + esc(WALVIS.email) + "</a></li>" +
            MENU.company.map(function (m) { return "<li>" + navLink(m) + "</li>"; }).join("") +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-base">' +
          "<span>&copy; " + new Date().getFullYear() + " Walvis Concierge &middot; " + esc(WALVIS.city) +
            ' &middot; <a href="privacy.html">Privacy</a> &middot; <a href="credits.html">Photo credits</a></span>' +
          (socialLinks ? '<ul class="footer-social" aria-label="Social media">' + socialLinks + "</ul>" : "") +
        "</div>" +
      "</div></footer>" +
      '<a class="wa-float" data-wa="' + esc(DEFAULT_MESSAGE) + '" aria-label="Message Walvis Concierge on WhatsApp">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.5 3.9 3.5 2 .8 2.3.7 2.8.6.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3Z"/></svg>' +
      "</a>";
  }

  /* ---------------------------------------------------------
     4. CARDS AND EDITORIAL BLOCKS
     --------------------------------------------------------- */
  // The item's photo, or an empty frame that says where a photo goes
  function photoHTML(item, attrs) {
    if (item.image) return '<img src="' + esc(item.image) + '" alt="' + esc(attrs === "detail" ? (item.alt || item.title) : "") + '"' +
      (attrs === "detail" ? ' fetchpriority="high"' : ' loading="lazy" decoding="async" width="700" height="875"') + ">";
    return '<span class="photo-frame" aria-hidden="true"><img src="' + esc(WALVIS.logo) + '" alt=""><span>Add a photo</span></span>';
  }
  // The small guide note shown above template lists
  function templateNoteHTML(cat) {
    var hasTemplates = cat.items.some(function (it) { return it.template; });
    return WALVIS.showTemplateNotes && hasTemplates && cat.templateNote ?
      '<p class="template-note">' + esc(cat.templateNote) + "</p>" : "";
  }
  function cardMarkup(key, item) {
    var cat = WALVIS_CATALOGUE[key];
    var meta = [item.duration, item.place].filter(Boolean).join(" · ");
    var url = itemURL(key, item);
    return '<article class="card reveal' + (item.template ? " card--template" : "") + '">' +
      '<a class="card-media" href="' + url + '" tabindex="-1" aria-hidden="true">' + photoHTML(item) + "</a>" +
      '<div class="card-body">' +
        '<span class="card-tag">' + esc(item.type || "") + "</span>" +
        '<h3><a href="' + url + '">' + esc(item.title) + "</a></h3>" +
        (meta ? '<p class="card-meta">' + esc(meta) + "</p>" : "") +
        '<p class="card-text">' + esc(item.summary) + "</p>" +
        '<div class="card-foot">' +
          (cat.showPrice ? '<div class="card-price">' + priceHTML(item) + availabilityHTML(item) + "</div>" : '<span class="price price--ask">Price on request</span>') +
          '<a class="link-arrow link-arrow--quiet" data-wa="' + esc(requestMessage(cat, item)) + '">Enquire<span class="visually-hidden">: ' + esc(item.title) + "</span></a>" +
        "</div>" +
      "</div>" +
    "</article>";
  }

  /* ---------- 4a. "Worlds": large editorial panels ----------
     HTML: <div data-worlds="travel"></div>                         */
  each("[data-worlds]", function (box) {
    var cat = WALVIS_CATALOGUE[box.getAttribute("data-worlds")];
    if (!cat || !cat.worlds) return;
    box.className += " worlds";
    box.innerHTML = cat.worlds.map(function (w) {
      return '<article class="world reveal">' +
        '<img src="' + esc(w.image) + '" alt="" loading="lazy" decoding="async">' +
        '<div class="world-body">' +
          '<span class="world-kicker">' + esc(w.kicker || "") + "</span>" +
          "<h3>" + esc(w.title) + "</h3>" +
          "<p>" + esc(w.text) + "</p>" +
          '<a class="link-arrow" data-wa="' + esc("Hello Walvis, I would like to ask about " + w.title.toLowerCase() + " (" + cat.name + ").") + '">Ask about this<span class="visually-hidden">: ' + esc(w.title) + "</span></a>" +
        "</div>" +
      "</article>";
    }).join("");
  });

  /* ---------- 4a2. Plans / pieces as a compact card grid ----------
     HTML: <div data-plans="travel"></div>                           */
  each("[data-plans]", function (box) {
    var key = box.getAttribute("data-plans");
    var cat = WALVIS_CATALOGUE[key];
    if (!cat) return;
    box.innerHTML = templateNoteHTML(cat) +
      '<div class="cards">' + cat.items.map(function (it) { return cardMarkup(key, it); }).join("") + "</div>";
  });

  /* ---------- 4b. Journeys / plans as alternating editorial rows ----------
     HTML: <div data-journeys="travel"></div>                       */
  each("[data-journeys]", function (box) {
    var key = box.getAttribute("data-journeys");
    var cat = WALVIS_CATALOGUE[key];
    if (!cat) return;
    box.className += " journeys";
    box.innerHTML = cat.items.map(function (it, i) {
      var url = itemURL(key, it);
      return '<article class="journey reveal' + (i % 2 ? " journey--flip" : "") + '">' +
        '<a class="journey-media" href="' + url + '" tabindex="-1" aria-hidden="true"><img src="' + esc(it.image) + '" alt="" loading="lazy" decoding="async"></a>' +
        '<div class="journey-body">' +
          '<span class="journey-num">' + (i < 9 ? "0" : "") + (i + 1) + "</span>" +
          '<span class="card-tag">' + esc([it.type, it.place].filter(Boolean).join(" · ")) + "</span>" +
          '<h3><a href="' + url + '">' + esc(it.title) + "</a></h3>" +
          (it.duration ? '<p class="card-meta">' + esc(it.duration) + "</p>" : "") +
          "<p>" + esc(it.summary) + "</p>" +
          (it.highlights ? '<ul class="ticks">' + it.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" : "") +
          '<div class="btn-row"><a class="btn" data-wa="' + esc(requestMessage(cat, it)) + '">Enquire</a><a class="btn btn--line" href="' + url + '">Discover</a></div>' +
        "</div>" +
      "</article>";
    }).join("");
  });

  /* ---------- 4c. Retail lookbook, grouped by type ----------
     HTML: <div data-lookbook="retail"></div>                       */
  each("[data-lookbook]", function (box) {
    var key = box.getAttribute("data-lookbook");
    var cat = WALVIS_CATALOGUE[key];
    if (!cat) return;
    var types = (cat.types || []).slice();
    cat.items.forEach(function (it) { if (types.indexOf(it.type) < 0) types.push(it.type); });
    box.innerHTML = types.map(function (t) {
      var list = cat.items.filter(function (it) { return it.type === t; });
      if (!list.length) return "";
      return '<section class="lookbook-group" id="' + slug(t) + '">' +
        '<div class="lookbook-head reveal"><h3>' + esc(t) + '</h3><span class="lookbook-count">' + list.length + (list.length === 1 ? " piece" : " pieces") + "</span></div>" +
        '<div class="cards">' + list.map(function (it) { return cardMarkup(key, it); }).join("") + "</div>" +
      "</section>";
    }).join("");
  });

  /* ---------- 4d. Carousels / short grids ----------
     HTML: <div class="rail" data-rail="retail" data-featured></div>
           data-type="Romance" to show one type only, data-limit="6" */
  each("[data-rail]", function (rail) {
    var key = rail.getAttribute("data-rail");
    var cat = WALVIS_CATALOGUE[key];
    if (!cat) return;
    var type = rail.getAttribute("data-type");
    var exclude = rail.getAttribute("data-exclude");
    var items = cat.items.filter(function (it) {
      if (rail.hasAttribute("data-featured") && !it.featured) return false;
      if (type && it.type !== type) return false;
      if (exclude && it.id === exclude) return false;
      return true;
    }).slice(0, Number(rail.getAttribute("data-limit")) || 99);
    rail.innerHTML = items.map(function (it) { return cardMarkup(key, it); }).join("");

    // Previous / next buttons for horizontal rails
    var controls = rail.parentNode.querySelector(".rail-controls");
    if (controls) {
      controls.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        var step = rail.clientWidth * 0.85 * (btn.getAttribute("data-dir") === "prev" ? -1 : 1);
        rail.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  });

  /* ---------- 4e. Item detail page (item.html?c=travel&id=...) ---------- */
  var detail = document.querySelector("[data-item]");
  if (detail) {
    var cKey = param("c"), cat = WALVIS_CATALOGUE[cKey], item = null;
    if (cat) cat.items.forEach(function (it) { if (it.id === param("id")) item = it; });

    if (!item) {
      detail.innerHTML = '<section class="section"><div class="wrap center narrow">' +
        '<span class="eyebrow">Not found</span><h1>We could not find that one.</h1>' +
        '<p class="lead">It may have been updated. Have a look around, or simply ask us.</p>' +
        '<div class="btn-row"><a class="btn" href="index.html">Back to home</a><a class="btn btn--line" data-wa="' + esc(DEFAULT_MESSAGE) + '">Ask on WhatsApp</a></div>' +
        "</div></section>";
    } else {
      document.title = item.title + " | " + cat.name + " | Walvis Concierge";
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", item.summary);
      var bodyKey = { travel: "travel", experiences: "experiences", retail: "retail", personalLife: "personal-life" }[cKey];
      if (bodyKey) {
        each('.nav a[href="' + cat.page + '"]', function (a) { a.classList.add("is-active"); });
      }
      var facts = [
        item.type ? ["Type", item.type] : null,
        item.region ? ["Where", item.place ? item.place : item.region] : (item.place ? ["Where", item.place] : null),
        item.duration ? ["Duration", item.duration] : null,
        cat.showPrice && item.availability ? ["Availability", item.availability] : null
      ].filter(Boolean);
      function list(title, arr) {
        return arr && arr.length ? '<div class="detail-list"><h2>' + title + '</h2><ul class="ticks">' +
          arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "";
      }
      detail.innerHTML =
        '<section class="detail">' +
          '<div class="detail-media">' + photoHTML(item, "detail") + "</div>" +
          '<div class="detail-info">' +
            '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="' + cat.page + '">' + esc(cat.name) + '</a></nav>' +
            '<span class="eyebrow">' + esc(item.type || cat.name) + "</span>" +
            "<h1>" + esc(item.title) + "</h1>" +
            '<p class="lead">' + esc(item.summary) + "</p>" +
            '<div class="detail-price">' + (cat.showPrice ? priceHTML(item) : '<span class="price price--ask">Price on request</span>') + "</div>" +
            '<dl class="facts">' + facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + "</dl>" +
            '<div class="btn-row"><a class="btn btn-wa" data-wa="' + esc(requestMessage(cat, item)) + '">Enquire on WhatsApp</a>' +
              '<a class="btn btn--line" href="' + cat.page + '">Back to ' + esc(cat.name) + "</a></div>" +
            '<p class="fine-print">' + (cat.showPrice ? "Prices are confirmed with you before anything is bought." : "Every plan is shaped around you. Nothing is booked until you say yes.") + "</p>" +
          "</div>" +
        "</section>" +
        ((item.highlights || item.includes || item.details) ?
          '<section class="section section--mist section--tight"><div class="wrap detail-lists">' +
            list("Highlights", item.highlights) + list("Included", item.includes) + list("Details", item.details) +
          "</div></section>" : "");


    }
  }

  /* ---------- 4f. Photo credits (credits.html) ---------- */
  var creditsBox = document.querySelector("[data-credits]");
  if (creditsBox && window.WALVIS_CREDITS) {
    creditsBox.innerHTML = WALVIS_CREDITS.map(function (c) {
      return "<li><strong>" + esc(c.file) + "</strong> · " + esc(c.title || "Untitled") + " · " + esc(c.creator) + " · " + esc(c.licence) +
        ' · <a href="' + esc(c.source) + '" rel="noopener" target="_blank">source</a></li>';
    }).join("");
  }

  /* ---------- 4g. The promise band ----------
     HTML: <div data-promise></div>  (add data-promise="plain" for no photo) */
  each("[data-promise]", function (slot) {
    var band = document.createElement("section");
    band.className = "promise";
    band.setAttribute("aria-label", "Our promise");
    band.innerHTML =
      '<div class="wrap reveal">' +
        '<p class="promise-line">' + PROMISE.line.replace("we can do it.", "<em>we can do it.</em>") + "</p>" +
        '<p class="promise-honest">' + PROMISE.honest + "</p>" +
        '<ul class="promise-rules">' + PROMISE.rules.map(function (r) { return "<li>" + r + "</li>"; }).join("") + "</ul>" +
      "</div>";
    slot.parentNode.replaceChild(band, slot);
  });

  /* ---------------------------------------------------------
     5. WHATSAPP LINKS
     --------------------------------------------------------- */
  function wireWhatsApp(root) {
    each("[data-wa]", function (el) {
      el.setAttribute("href", waLink(el.getAttribute("data-wa")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }, root);
  }
  wireWhatsApp(document);

  each("[data-fill]", function (el) {
    var k = el.getAttribute("data-fill");
    el.textContent = WALVIS[k] || "";
    if (k === "phone") el.setAttribute("href", telLink(WALVIS.phone));
    if (k === "email") el.setAttribute("href", "mailto:" + WALVIS.email);
  });

  // The browser-tab icon is a <link rel="icon"> in each page's <head>.

  /* ---------------------------------------------------------
     6. TABS (home page membership)
     HTML: [data-tabs] with [role=tab] buttons and [role=tabpanel]
     --------------------------------------------------------- */
  each("[data-tabs]", function (tabs) {
    var buttons = tabs.querySelectorAll('[role="tab"]');
    function select(btn) {
      Array.prototype.forEach.call(buttons, function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    }
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest('[role="tab"]');
      if (b) select(b);
    });
    tabs.addEventListener("keydown", function (e) {
      var i = Array.prototype.indexOf.call(buttons, document.activeElement);
      if (i < 0) return;
      var next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
      if (next === null) return;
      next = (next + buttons.length) % buttons.length;
      buttons[next].focus(); select(buttons[next]);
    });
  });

  /* ---------------------------------------------------------
     6a. PERSONAL LIFE PAGE: expanding category tiles
     HTML: <button data-tile aria-expanded="false" aria-controls="panel-id">
     Click, tap, Enter or Space opens and closes a tile.
     --------------------------------------------------------- */
  each("[data-tile]", function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var tile = btn.closest(".pl-tile");
      if (tile) tile.classList.toggle("is-open", open);
    });
  });

  /* ---------------------------------------------------------
     6b. HERO SLIDESHOW (home page)
     HTML: <div class="hero-slides" data-slides> with <img> inside.
     Slowly cross-fades between the photos. Paused for visitors
     who prefer reduced motion.
     --------------------------------------------------------- */
  each("[data-slides]", function (box) {
    var slides = box.querySelectorAll("img");
    if (slides.length < 2) return;
    var i = 0;
    slides[0].classList.add("is-on");
    if (reduceMotion) return;
    setInterval(function () {
      slides[i].classList.remove("is-on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-on");
    }, 7000);
  });

  /* ---------------------------------------------------------
     7. HEADER BEHAVIOUR
     --------------------------------------------------------- */
  var header = document.getElementById("header");
  function onScroll() { if (header) header.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var dropToggle = document.querySelector(".drop-toggle");
  var dropItem = dropToggle && dropToggle.parentNode;
  function setDrop(open) {
    if (!dropToggle) return;
    dropItem.classList.toggle("is-open", open);
    dropToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (dropToggle) {
    dropToggle.addEventListener("click", function () { setDrop(dropToggle.getAttribute("aria-expanded") !== "true"); });
    dropItem.addEventListener("keydown", function (e) { if (e.key === "Escape") { setDrop(false); dropToggle.focus(); } });
    dropItem.addEventListener("focusout", function (e) { if (!dropItem.contains(e.relatedTarget)) setDrop(false); });
    document.addEventListener("click", function (e) { if (!dropItem.contains(e.target)) setDrop(false); });
  }

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var desktopQuery = window.matchMedia("(min-width: 1300px)");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) setTimeout(function () { var f = nav.querySelector("a, button"); if (f) f.focus(); }, 60);
  }
  if (burger && nav) {
    burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) {
      if (!document.body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { setMenu(false); burger.focus(); return; }
      if (e.key === "Tab") {
        var f = [burger].concat(Array.prototype.slice.call(nav.querySelectorAll("a, button")));
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    var onWidth = function () { if (desktopQuery.matches) setMenu(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onWidth);
    else if (desktopQuery.addListener) desktopQuery.addListener(onWidth);
  }

  /* ---------------------------------------------------------
     8. GENTLE REVEAL ON SCROLL
     --------------------------------------------------------- */
  if (reduceMotion || !("IntersectionObserver" in window)) {
    each(".reveal", function (el) { el.classList.add("in"); });
  } else {
    each(".reveal", function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("reveal"); });
      var i = sibs.indexOf(el);
      if (sibs.length > 1 && i > 0) el.style.transitionDelay = (i % 4) * 110 + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    each(".reveal", function (el) { if (!el.classList.contains("in")) io.observe(el); });
  }
})();
