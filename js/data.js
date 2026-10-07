/* =========================================================
   WALVIS CONCIERGE · js/data.js
   ---------------------------------------------------------
   This is the file you will edit most often.

   1. CONTACT DETAILS + LOGO
   2. COLLECTIONS – what each page shows:
        travel        → travel.html
        experiences   → experiences.html
        personalLife  → personal-life.html
        retail        → retail.html (The Collection, with prices)

   Each collection has two lists:
     worlds  – the large editorial panels at the top of the page
               (the kinds of things we do, each with an "Ask" button)
     items   – the individual plans / pieces. Each one also gets
               its own page automatically (item.html?c=travel&id=...)

   TEMPLATES
   Every "items" list below holds three TEMPLATE blocks that show
   where your own plans and pieces go. Replace the words in quotes
   with your own, add a photo, and delete the line "template: true".
   To add more: copy one { ... } block, paste it under the last one,
   and put a comma between blocks.
   While any template is still in place, a short guide note shows
   above it on the page. Turn the notes off with showTemplateNotes.

   Only Retail shows prices. Write price as a number in taka with no
   commas (185000). Use 0 to show "Price on request".
   ========================================================= */

var WALVIS = {

  /* ---------- 1. CONTACT DETAILS ---------- */

  // PLACEHOLDER: real WhatsApp number. Digits only, with country code, no "+" or spaces.
  whatsapp: "8801000000000",

  // PLACEHOLDER: phone number exactly as it should be displayed.
  phone: "+880 1000 000000",

  email: "walvisconcierge@gmail.com",
  city: "Dhaka, Bangladesh",

  // PLACEHOLDERS: replace each "#" with the real page address. Delete a line to hide it.
  social: {
    Instagram: "#",
    Facebook: "#",
    LinkedIn: "#"
  },

  // The logo seal (round, transparent background).
  logo: "images/logo/walvis-seal-96.png",

  // Currency symbol shown before retail prices
  currency: "৳",

  // true = show the small "Template: add your ..." guide notes on the pages.
  // Set to false before launch.
  showTemplateNotes: true
};


var WALVIS_CATALOGUE = {

  /* =======================================================
     TRAVEL
     ======================================================= */
  travel: {
    name: "Travel",
    page: "travel.html",
    showPrice: false,
    worlds: [
      { title: "Private aviation", kicker: "By air", image: "images/lux-private-jet.jpg",
        text: "Your aircraft, your hour. Private jets and helicopters arranged with crew, catering and quiet terminals." },
      { title: "Yachts and cruises", kicker: "By sea", image: "images/lux-superyacht.jpg",
        text: "A yacht on the Riviera, a suite at sea or a private vessel through the Sundarbans." },
      { title: "The grand hotels", kicker: "To stay", image: "images/lux-ocean-lounge.jpg",
        text: "The best suite, the right floor, the view you asked for and someone expecting you." },
      { title: "Honeymoons", kicker: "For two", image: "images/lux-maldives-lagoon.jpg",
        text: "Overwater villas, island dinners and days that belong to nobody else." },
      { title: "Umrah and Hajj", kicker: "With care", image: "images/bd-star-mosque-interior.jpg",
        text: "Pilgrimage arranged with dignity: trusted operators, close hotels and a calm journey for the family." },
      { title: "Bangladesh, privately", kicker: "At home", image: "images/bd-ahsan-manzil.jpg",
        text: "Palaces of Old Dhaka, the coast by private boat and the country as very few people see it." },
      { title: "Mountains and winter", kicker: "To the peaks", image: "images/lux-alpenglow.jpg",
        text: "Alpine chalets, slopes at first light and a fire waiting when you come in." },
      { title: "Cities after dark", kicker: "The world", image: "images/lux-paris-night.jpg",
        text: "Paris, Dubai, London, Istanbul. The tables, the shows and the doors that are usually closed." }
    ],
    // TEMPLATE: shown on the page as a guide until you add real ones.
    templateNote: "Template: add your travel plans in js/data.js → travel → items. Each card shows where the photo, name, place, duration and description go.",
    items: [
      {
        // ---- TEMPLATE 1: replace everything in quotes with your own plan ----
        id: "plan-1",                      // short unique name, lowercase-with-dashes
        title: "Your plan name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this plan: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the plan is real
      },
      {
        // ---- TEMPLATE 2: replace everything in quotes with your own plan ----
        id: "plan-2",                      // short unique name, lowercase-with-dashes
        title: "Your plan name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this plan: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the plan is real
      },
      {
        // ---- TEMPLATE 3: replace everything in quotes with your own plan ----
        id: "plan-3",                      // short unique name, lowercase-with-dashes
        title: "Your plan name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this plan: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the plan is real
      }
    ]
  },


  /* =======================================================
     EXPERIENCES
     ======================================================= */
  experiences: {
    name: "Experiences",
    page: "experiences.html",
    showPrice: false,
    worlds: [
      { title: "Celebrations", kicker: "Milestones", image: "images/lux-red-staircase.jpg",
        text: "Birthdays, anniversaries and the evenings people still talk about years later." },
      { title: "Romance", kicker: "For two", image: "images/lux-wedding-silhouette.jpg",
        text: "Proposals, surprises and the kind of quiet that takes planning." },
      { title: "Private dining", kicker: "At the table", image: "images/lux-place-setting.jpg",
        text: "A chef at home, a table that is never free, a menu written for one night." },
      { title: "Weddings", kicker: "The big day", image: "images/bd-holud-stage.jpg",
        text: "Gaye holud to reception, designed and produced so the family can simply enjoy it." },
      { title: "Wellness", kicker: "To restore", image: "images/lux-copper-bath.jpg",
        text: "Spa days at home, retreats and time that asks nothing of you." },
      { title: "Culture", kicker: "To remember", image: "images/lux-piano.jpg",
        text: "Private recitals, gallery evenings and access to what is sold out." }
    ],
    // TEMPLATE: shown on the page as a guide until you add real ones.
    templateNote: "Template: add your experiences in js/data.js → experiences → items. Each card shows where the photo, name and description go.",
    items: [
      {
        // ---- TEMPLATE 1: replace everything in quotes with your own experience ----
        id: "experience-1",                      // short unique name, lowercase-with-dashes
        title: "Your experience name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this experience: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the experience is real
      },
      {
        // ---- TEMPLATE 2: replace everything in quotes with your own experience ----
        id: "experience-2",                      // short unique name, lowercase-with-dashes
        title: "Your experience name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this experience: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the experience is real
      },
      {
        // ---- TEMPLATE 3: replace everything in quotes with your own experience ----
        id: "experience-3",                      // short unique name, lowercase-with-dashes
        title: "Your experience name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        place: "Place",                            // where it happens (leave "" if not needed)
        duration: "Duration",                      // e.g. "5 nights" (leave "" if not needed)
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this experience: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the experience is real
      }
    ]
  },


  /* =======================================================
     PERSONAL LIFE
     ======================================================= */
  personalLife: {
    name: "Personal Life",
    page: "personal-life.html",
    showPrice: false,
    worlds: [
      { title: "Flowers", kicker: "Sent today", image: "images/roses.jpg",
        text: "Hand-tied, delivered in water, with your words on the card." },
      { title: "Cakes and mishti", kicker: "Sweet things", image: "images/pl-birthday-cake.jpg",
        text: "From the bakeries and sweet shops that do it best, on the right day." },
      { title: "Gifts", kicker: "Chosen for them", image: "images/retail-gift-box.jpg",
        text: "For the person, not the occasion. Wrapped and delivered by hand." },
      { title: "Remembered dates", kicker: "Never missed", image: "images/lux-candlelight.jpg",
        text: "Give us the calendar once. A reminder, or simply done." }
    ],
    // TEMPLATE: shown on the page as a guide until you add real ones.
    templateNote: "Template: add your gift ideas in js/data.js → personalLife → items.",
    items: [
      {
        // ---- TEMPLATE 1: replace everything in quotes with your own gift ----
        id: "gift-1",                      // short unique name, lowercase-with-dashes
        title: "Your gift name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this gift: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the gift is real
      },
      {
        // ---- TEMPLATE 2: replace everything in quotes with your own gift ----
        id: "gift-2",                      // short unique name, lowercase-with-dashes
        title: "Your gift name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this gift: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the gift is real
      },
      {
        // ---- TEMPLATE 3: replace everything in quotes with your own gift ----
        id: "gift-3",                      // short unique name, lowercase-with-dashes
        title: "Your gift name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this gift: the feeling, the setting and what makes it special.",
        highlights: ["First highlight", "Second highlight", "Third highlight"],
        template: true                             // delete this line when the gift is real
      }
    ]
  },


  /* =======================================================
     RETAIL · The Collection (with prices)
     Items are grouped on the page by "type", in the order of "types".
     ======================================================= */
  retail: {
    name: "The Collection",
    page: "retail.html",
    showPrice: true,
    types: ["Jewellery", "Timepieces", "Heritage crafts", "Fragrance", "Fashion", "Home & art", "Gifting"],
    // TEMPLATE: shown on the page as a guide until you add real ones.
    templateNote: "Template: add your pieces in js/data.js → retail → items, with the price and availability for each.",
    items: [
      {
        // ---- TEMPLATE 1: replace everything in quotes with your own piece ----
        id: "piece-1",                      // short unique name, lowercase-with-dashes
        title: "Your piece name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        price: 0,                                  // price in taka, no commas, e.g. 185000
        priceText: "৳ Price",                      // TEMPLATE ONLY: delete this line once you set a real price
        availability: "Availability",              // e.g. "In stock", "Made to order", "One piece only"
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this piece: the feeling, the setting and what makes it special.",
        details: ["Material or size", "Origin or maker", "Delivery time"],
        template: true                             // delete this line when the piece is real
      },
      {
        // ---- TEMPLATE 2: replace everything in quotes with your own piece ----
        id: "piece-2",                      // short unique name, lowercase-with-dashes
        title: "Your piece name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        price: 0,                                  // price in taka, no commas, e.g. 185000
        priceText: "৳ Price",                      // TEMPLATE ONLY: delete this line once you set a real price
        availability: "Availability",              // e.g. "In stock", "Made to order", "One piece only"
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this piece: the feeling, the setting and what makes it special.",
        details: ["Material or size", "Origin or maker", "Delivery time"],
        template: true                             // delete this line when the piece is real
      },
      {
        // ---- TEMPLATE 3: replace everything in quotes with your own piece ----
        id: "piece-3",                      // short unique name, lowercase-with-dashes
        title: "Your piece name",
        type: "Category",                          // e.g. Honeymoon, Celebration, Jewellery
        price: 0,                                  // price in taka, no commas, e.g. 185000
        priceText: "৳ Price",                      // TEMPLATE ONLY: delete this line once you set a real price
        availability: "Availability",              // e.g. "In stock", "Made to order", "One piece only"
        image: "",                                 // e.g. "images/your-photo.jpg"; empty shows a photo frame
        summary: "Two or three sentences that paint the picture of this piece: the feeling, the setting and what makes it special.",
        details: ["Material or size", "Origin or maker", "Delivery time"],
        template: true                             // delete this line when the piece is real
      }
    ]
  }
};
