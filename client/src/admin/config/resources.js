// Declarative config driving the generic admin CRUD screens (ResourceList / ResourceForm).
// Each entry maps 1:1 to a backend collection route mounted in server/src/app.js.
export const RESOURCES = [
  {
    key: 'slides', label: 'Home Slides', api: '/slides', imageField: 'image',
    fields: [
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
      { name: 'eyebrowText', label: 'Small Label Above Headline (e.g. "Best In Town")', type: 'text' },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaLink', label: 'CTA Link', type: 'text' },
      { name: 'videoUrl', label: 'Play Button Video URL (YouTube link)', type: 'text' },
      { name: 'happyClientsCount', label: 'Happy Clients Count (e.g. "2,000+")', type: 'text' },
      { name: 'happyClientsLabel', label: 'Happy Clients Label (e.g. "Happy Clients")', type: 'text' },
      { name: 'counter1Value', label: 'Counter 1 - Value (e.g. "50k+")', type: 'text' },
      { name: 'counter1Label', label: 'Counter 1 - Label (e.g. "Clients Review")', type: 'text' },
      { name: 'counter2Value', label: 'Counter 2 - Value (e.g. "100+")', type: 'text' },
      { name: 'counter2Label', label: 'Counter 2 - Label (e.g. "Expert Surgeon")', type: 'text' },
      { name: 'counter3Value', label: 'Counter 3 - Value (e.g. "20+")', type: 'text' },
      { name: 'counter3Label', label: 'Counter 3 - Label (e.g. "Award Winner")', type: 'text' },
      { name: 'page', label: 'Page', type: 'select', options: ['home'] },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Slide Background Image', type: 'image' },
      { name: 'heroImage', label: 'Hero Photo (right side of banner)', type: 'image' },
      { name: 'clientAvatarsImage', label: 'Client Avatars Icon ("2,000+ Happy Clients")', type: 'image' },
    ],
  },
  {
    key: 'services', label: 'Services', api: '/services', imageField: 'image', hasSlug: true,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      {
        name: 'category', label: 'Category', type: 'select',
        options: [
          'Cosmetic & Aesthetic Surgery',
          'Reconstructive Surgery',
          'Burn & Scar Reconstruction',
          'Hand & Microsurgery',
          'Congenital & Pediatric Plastic Surgery',
          'Hair & Minor Aesthetic Procedures',
        ],
      },
      { name: 'shortDesc', label: 'Short Description', type: 'textarea' },
      { name: 'bodyContent', label: 'Full Description (HTML)', type: 'richtext' },
      { name: 'metaTitle', label: 'Meta Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'gallery', label: 'Gallery Images (shown on the service details page)', type: 'imageArray' },
    ],
  },
  {
    key: 'how-it-work-steps', label: 'How It Works Steps', api: '/how-it-work-steps',
    fields: [
      { name: 'stepNumber', label: 'Step #', type: 'text' },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icon', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
    ],
  },
  {
    key: 'testimonials', label: 'Testimonials', api: '/testimonials', imageField: 'photo',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'photo', label: 'Photo', type: 'image' },
    ],
  },
  {
    key: 'gallery-items', label: 'Before/After', api: '/gallery-items', imageField: 'image',
    fields: [
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'brand-logos', label: 'Brand Logos', api: '/brand-logos', imageField: 'image',
    fields: [
      { name: 'link', label: 'Link URL', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Logo', type: 'image' },
    ],
  },
  {
    key: 'posts', label: 'Blog Posts', api: '/posts', imageField: 'coverImage', hasSlug: true,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'tags', label: 'Tags (comma-separated)', type: 'tags' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body (HTML)', type: 'richtext', required: true },
      { name: 'metaTitle', label: 'Meta Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
      { name: 'coverImage', label: 'Cover Image', type: 'image' },
    ],
  },
  {
    key: 'projects', label: 'Projects', api: '/projects', imageField: 'image', hasSlug: true,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'about-reels', label: 'About Page - Reels', api: '/about-reels',
    fields: [
      { name: 'caption', label: 'Caption (optional — small text under the reel)', type: 'text' },
      { name: 'linkUrl', label: 'Click-through Link (optional — e.g. the Instagram reel URL. Leave empty and the reel plays in a popup on the site)', type: 'text' },
      { name: 'order', label: 'Order (smaller number shows first)', type: 'number' },
      { name: 'video', label: 'Reel Video (vertical 9:16 works best — MP4 / MOV / WEBM, max 100 MB)', type: 'video' },
    ],
  },
  {
    key: 'nav-items', label: 'Nav Menu', api: '/nav-items',
    fields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'link', label: 'Link (e.g. /online-consultation)', type: 'text', required: true },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'openInNewTab', label: 'Open In A New Tab', type: 'boolean' },
    ],
  },
];

export const getResourceConfig = (key) => RESOURCES.find((r) => r.key === key);

// Singleton (one-row) resources, edited via a dedicated form rather than a list.
export const SINGLETONS = [
  {
    key: 'site-settings', label: 'Site Settings', api: '/site-settings',
    fields: [
      { name: 'topContactPhone', label: 'Header Phone', type: 'text' },
      { name: 'topContactEmail', label: 'Contact Email', type: 'text' },
      { name: 'topContactAddress', label: 'Address', type: 'text' },
      { name: 'headerCtaText', label: 'Header Button Text', type: 'text' },
      { name: 'headerCtaLink', label: 'Header Button Link', type: 'text' },
      { name: 'copyrightText', label: 'Footer Copyright Text', type: 'textarea' },
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'logoAlt', label: 'Footer / Alt Logo', type: 'image' },
      { name: 'footerBgImage', label: 'Footer Background Decoration Image', type: 'image' },
      { name: 'newsletterHeading', label: 'Footer Newsletter Heading', type: 'text' },
      { name: 'footerColumns', label: 'Footer "Quick Links" Column (JSON array: [{ "heading": "", "links": [{ "label": "", "url": "" }] }]) — the "Our Services" column next to it fills in automatically from your Services list, no need to duplicate it here', type: 'json' },
      { name: 'socialLinks', label: 'Social Links (JSON array: [{ "url": "", "icon": "fab fa-facebook-f" }])', type: 'json' },
      { name: 'footerLegalLinks', label: 'Footer Legal Links (JSON array: [{ "label": "", "url": "" }])', type: 'json' },
      { name: 'tickerItems', label: 'Ticker Items (JSON array)', type: 'json' },
    ],
  },
  {
    key: 'about-section', label: 'About Page - Content (/about only; add reels under Collections → About Page - Reels)', api: '/about-section',
    fields: [
      { name: 'bioLabel', label: 'Small Label above the heading (e.g. "About Us")', type: 'text' },
      { name: 'bioHeading', label: 'Doctor Heading (e.g. "Meet Dr. Aakansh Jain")', type: 'text' },
      { name: 'bioTagline', label: 'Text shown in brackets beside the heading — type it WITHOUT brackets, they are added for you (leave empty to hide)', type: 'text' },
      { name: 'bioText', label: 'Doctor Bio — leave a blank line between paragraphs; put **double asterisks** around words to make them bold', type: 'textarea' },
      { name: 'bioSignature', label: 'Bold Closing Line under the bio (optional — leave empty to hide)', type: 'text' },
      { name: 'images', label: 'Photos', type: 'imageArray' },
      { name: 'badgeText', label: 'Floating Badge Text (short, sits on the photo)', type: 'text' },
      { name: 'highlights', label: 'Highlight Chips (JSON array: icon + text)', type: 'json' },
      { name: 'featuredVideoHeading', label: 'Video Section - Heading (e.g. "Watch & Listen")', type: 'text' },
      { name: 'featuredVideoSubheading', label: 'Video Section - Small line under the heading (optional)', type: 'text' },
      { name: 'featuredVideoUrls', label: 'Video / Podcast Links - paste YouTube or Vimeo links, one per line (a single link shows one big video; several show side by side). Leave empty to hide the section', type: 'lines' },
      { name: 'reelsHeading', label: 'Reels Section - Heading (e.g. "Our Reels")', type: 'text' },
      { name: 'reelsSubheading', label: 'Reels Section - Small line under the heading', type: 'text' },
    ],
  },
  {
    key: 'gallery-section', label: 'Home Page - Before/After Heading (/ only)', api: '/gallery-section',
    fields: [
      { name: 'eyebrow', label: 'Small Eyebrow Label (e.g. "Before/After")', type: 'text' },
      { name: 'heading', label: 'Main Heading', type: 'text' },
      { name: 'buttonText', label: '"View All Before/After" Button Text', type: 'text' },
      { name: 'buttonLink', label: '"View All Before/After" Button Link', type: 'text' },
    ],
  },
  {
    key: 'centre-page', label: 'Know The Centre Page (/know-the-centre)', api: '/centre-page',
    fields: [
      { name: 'welcomeHeading', label: 'Top Heading (e.g. "Welcome To Natural Cosmetic Surgery Centre")', type: 'text' },
      { name: 'welcomeText', label: 'Top Intro Text (optional — leave a blank line between paragraphs; leave empty to show only the heading)', type: 'textarea' },
      { name: 'images', label: 'Photos (shown stacked on the left, top to bottom — delete with × and upload new ones)', type: 'imageArray' },
      { name: 'aimHeading', label: 'Aim - Heading', type: 'text' },
      { name: 'aimText', label: 'Aim - Text', type: 'textarea' },
      { name: 'missionHeading', label: 'Mission - Heading', type: 'text' },
      { name: 'missionText', label: 'Mission - Text', type: 'textarea' },
      { name: 'visionHeading', label: 'Vision - Heading', type: 'text' },
      { name: 'visionText', label: 'Vision - Text', type: 'textarea' },
      { name: 'buttonText', label: 'Button Text (e.g. "Connect With Us" — clear to hide the button)', type: 'text' },
      { name: 'buttonLink', label: 'Button Link (e.g. /contact)', type: 'text' },
      { name: 'valuesHeading', label: 'Values Section - Heading (e.g. "Our Values")', type: 'text' },
      { name: 'valuesIntro', label: 'Values Section - Intro Line (optional)', type: 'text' },
      { name: 'values', label: 'Values (JSON array: [{ "icon": "fa-light fa-heart-pulse", "label": "Integrity" }] — icon is a Font Awesome class. The whole Values section stays hidden while this list is empty)', type: 'json' },
    ],
  },
  {
    key: 'home-about-section', label: 'Home Page - About Box (/ only)', api: '/home-about-section',
    fields: [
      { name: 'subheading', label: 'Small Eyebrow Label (e.g. "About Us")', type: 'text' },
      { name: 'heading', label: 'Main Heading', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'primaryImage', label: 'Main Photo', type: 'image' },
      { name: 'secondaryImage', label: 'Secondary Overlapping Photo', type: 'image' },
      { name: 'badgeIcon', label: 'Badge Icon (Font Awesome class)', type: 'text' },
      { name: 'badgeText', label: 'Badge Text (e.g. "Best Awarded Company")', type: 'text' },
      { name: 'pillButtons', label: 'Pill Buttons Row (JSON array: [{ "text": "", "link": "", "icon": "" }] — leave "link" empty for a non-clickable "coming soon" pill)', type: 'json' },
      { name: 'featurePoints', label: 'Checklist Points (JSON array: [{ "text": "" }])', type: 'json' },
      { name: 'ctaText', label: '"Read More" Button Text', type: 'text' },
      { name: 'ctaLink', label: '"Read More" Button Link', type: 'text' },
      { name: 'ratingValue', label: 'Rating Value (e.g. "4.9")', type: 'text' },
      { name: 'ratingText', label: 'Rating Caption (e.g. "100+ 5star")', type: 'text' },
    ],
  },
  {
    key: 'booking-info-section', label: 'Home Page - How To Book (/ only)', api: '/booking-info-section',
    fields: [
      { name: 'eyebrow', label: 'Small Eyebrow Label (e.g. "Booking Made Easy")', type: 'text' },
      { name: 'heading', label: 'Main Heading', type: 'text' },
      { name: 'description', label: 'Intro Description (optional)', type: 'textarea' },

      { name: 'offlineHeading', label: 'Offline Booking - Card Heading', type: 'text' },
      { name: 'offlineDescription', label: 'Offline Booking - Card Description', type: 'textarea' },
      { name: 'offlineAddress', label: 'Offline Booking - Clinic Address (shown on the card)', type: 'text' },
      { name: 'offlineButtonText', label: 'Offline Booking - Button Text', type: 'text' },
      { name: 'offlineButtonLink', label: 'Offline Booking - Button Link (e.g. "tel:+919811171293")', type: 'text' },

      { name: 'onlineHeading', label: 'Online Booking - Card Heading', type: 'text' },
      { name: 'onlineDescription', label: 'Online Booking - Card Description', type: 'textarea' },
      { name: 'onlineButtonText', label: 'Online Booking - Button Text', type: 'text' },
      { name: 'onlineButtonLink', label: 'Online Booking - Button Link (e.g. "/contact")', type: 'text' },

      { name: 'contactFormHeading', label: 'Contact Form Card - Heading', type: 'text' },
      { name: 'contactFormDescription', label: 'Contact Form Card - Description', type: 'textarea' },
      { name: 'contactFormButtonText', label: 'Contact Form Card - Button Text', type: 'text' },
      { name: 'contactFormButtonLink', label: 'Contact Form Card - Button Link (e.g. "/contact")', type: 'text' },
    ],
  },
  {
    key: 'consultation-section', label: 'Online Consultation Page (/online-consultation)', api: '/consultation-section',
    fields: [
      { name: 'eyebrow', label: 'Small Eyebrow Label', type: 'text' },
      { name: 'introHeading', label: 'Intro Heading', type: 'textarea' },
      { name: 'introParagraph1', label: 'Intro Paragraph 1', type: 'textarea' },
      { name: 'introParagraph2', label: 'Intro Paragraph 2', type: 'textarea' },

      { name: 'processHeading', label: '"How It Works" Strip - Heading', type: 'text' },
      { name: 'processSteps', label: '"How It Works" Steps (JSON array: [{ "icon": "fa-light fa-file-pen", "title": "Fill Up Our Form" }])', type: 'json' },

      { name: 'formHeading', label: 'Booking Form - Heading', type: 'text' },
      { name: 'consentCheckboxLabel', label: 'Consent Checkbox Label', type: 'text' },
      { name: 'viewConsentLinkText', label: '"View Informed Consent" Link Text', type: 'text' },
      { name: 'submitButtonText', label: 'Submit Button Text', type: 'text' },

      { name: 'feeTableHeading', label: 'Fee Table - Heading', type: 'textarea' },
      { name: 'feeTableNote', label: 'Fee Table - Note (below table)', type: 'text' },
      { name: 'feeRows', label: 'Fee Table Rows (JSON array: [{ "type": "Video", "client": "New", "fee": "\u20b9 1000", "duration": "10 min" }])', type: 'json' },

      { name: 'paymentHeading', label: 'Payment Section - Heading', type: 'text' },
      { name: 'upiId', label: 'UPI ID', type: 'text' },
      { name: 'paymentMobile', label: 'Payment Mobile Number', type: 'text' },
      { name: 'paymentNote', label: 'Payment Note', type: 'textarea' },
      { name: 'paymentQrImage', label: 'Payment QR Code Image', type: 'image' },
      { name: 'paymentDoctorPhoto', label: 'Doctor Payment Photo (circular "scan to pay" avatar)', type: 'image' },
      { name: 'paymentDoctorPhotoCaption', label: 'Doctor Payment Photo Caption', type: 'text' },

      { name: 'termsHeading', label: 'Terms & Conditions - Heading', type: 'text' },
      { name: 'termsItems', label: 'Terms & Conditions Items (one per line)', type: 'lines' },
      { name: 'regulationNote', label: 'Regulation Note (bottom of page)', type: 'textarea' },

      { name: 'consentModalTitle', label: 'Consent Popup - Title', type: 'text' },

      { name: 'consentGuidelinesHeading', label: 'Consent Popup - Guidelines Heading', type: 'text' },
      { name: 'consentGuidelinesItems', label: 'Consent Popup - Guidelines Items (one per line)', type: 'lines' },

      { name: 'consentDoctorHeading', label: 'Consent Popup - Doctor ID Heading', type: 'text' },
      { name: 'consentDoctorName', label: 'Consent Popup - Doctor Name', type: 'text' },
      { name: 'consentDoctorQualification', label: 'Consent Popup - Doctor Qualification', type: 'text' },
      { name: 'consentDoctorCouncil', label: 'Consent Popup - Medical Council', type: 'text' },
      { name: 'consentDoctorRegNo', label: 'Consent Popup - Registration No.', type: 'text' },

      { name: 'consentAppointmentSlotsHeading', label: 'Consent Popup - Appointment Slots Heading', type: 'text' },
      { name: 'consentAppointmentSlotsText', label: 'Consent Popup - Appointment Slots Text', type: 'textarea' },

      { name: 'consentIntroHeading', label: 'Consent Popup - Introduction Heading', type: 'text' },
      { name: 'consentIntroText', label: 'Consent Popup - Introduction Text', type: 'textarea' },
      { name: 'consentIntroItems', label: 'Consent Popup - Introduction Items (one per line)', type: 'lines' },
      { name: 'consentIntroFooter', label: 'Consent Popup - Introduction Footer Text', type: 'textarea' },

      { name: 'consentBenefitsHeading', label: 'Consent Popup - Benefits Heading', type: 'text' },
      { name: 'consentBenefitsItems', label: 'Consent Popup - Benefits Items (one per line)', type: 'lines' },

      { name: 'consentRisksHeading', label: 'Consent Popup - Risks Heading', type: 'text' },
      { name: 'consentRisksIntro', label: 'Consent Popup - Risks Intro Text', type: 'textarea' },
      { name: 'consentRisksItems', label: 'Consent Popup - Risks Items (one per line)', type: 'lines' },

      { name: 'consentFinancialText', label: 'Consent Popup - Financial Responsibility Text', type: 'textarea' },

      { name: 'consentExplicitHeading', label: 'Consent Popup - Explicit Consent Heading', type: 'text' },
      { name: 'consentExplicitIntro', label: 'Consent Popup - Explicit Consent Intro Text', type: 'text' },
      { name: 'consentExplicitItems', label: 'Consent Popup - Explicit Consent Items (one per line)', type: 'lines' },

      { name: 'consentFooterText', label: 'Consent Popup - Footer Text', type: 'textarea' },
    ],
  },
  {
    key: 'booking-section', label: 'Booking Section', api: '/booking-section',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'contact-info', label: 'Contact Info', api: '/contact-info',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'officeHours', label: 'Office Hours', type: 'text' },
      { name: 'mapEmbedUrl', label: 'Map Embed URL', type: 'text' },
    ],
  },
  {
    key: 'page-meta-home', label: 'Browser Tab Title - Home Page', api: '/page-meta/home',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-about', label: 'Browser Tab Title - About Page', api: '/page-meta/about',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-centre', label: 'Browser Tab Title - Know The Centre Page', api: '/page-meta/centre',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-services', label: 'Browser Tab Title - Services Page', api: '/page-meta/services',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-projects', label: 'Browser Tab Title - Before/After Page', api: '/page-meta/projects',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-blog', label: 'Browser Tab Title - Blog Page', api: '/page-meta/blog',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-contact', label: 'Browser Tab Title - Contact Page', api: '/page-meta/contact',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-thank-you', label: 'Browser Tab Title - Thank You Page', api: '/page-meta/thank-you',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
  {
    key: 'page-meta-online-consultation', label: 'Browser Tab Title - Online Consultation Page', api: '/page-meta/online-consultation',
    fields: [
      { name: 'title', label: 'Browser Tab Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description (shown in Google search results)', type: 'textarea' },
    ],
  },
];