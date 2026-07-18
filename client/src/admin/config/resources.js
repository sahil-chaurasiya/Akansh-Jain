// Declarative config driving the generic admin CRUD screens (ResourceList / ResourceForm).
// Each entry maps 1:1 to a backend collection route mounted in server/src/app.js.
export const RESOURCES = [
  {
    key: 'slides', label: 'Home Slides', api: '/slides', imageField: 'image',
    fields: [
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaLink', label: 'CTA Link', type: 'text' },
      { name: 'page', label: 'Page', type: 'select', options: ['home', 'home2'] },
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
      { name: 'shortDesc', label: 'Short Description', type: 'textarea' },
      { name: 'icon', label: 'Icon (path or class)', type: 'text' },
      { name: 'bodyContent', label: 'Full Description (HTML)', type: 'richtext' },
      { name: 'metaTitle', label: 'Meta Title', type: 'text' },
      { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'image', label: 'Image', type: 'image' },
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
    key: 'gallery-items', label: 'Gallery / Before-After', api: '/gallery-items', imageField: 'image',
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
    key: 'faq-items', label: 'FAQ Items', api: '/faq-items',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'page', label: 'Page (home / services / team / faq)', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
    ],
  },
  {
    key: 'nav-items', label: 'Nav Menu', api: '/nav-items',
    fields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'link', label: 'Link', type: 'text', required: true },
      { name: 'order', label: 'Order', type: 'number' },
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
      { name: 'footerColumns', label: 'Footer Link Columns (JSON array: [{ "heading": "", "links": [{ "label": "", "url": "" }] }])', type: 'json' },
      { name: 'socialLinks', label: 'Social Links (JSON array: [{ "url": "", "icon": "fab fa-facebook-f" }])', type: 'json' },
      { name: 'footerLegalLinks', label: 'Footer Legal Links (JSON array: [{ "label": "", "url": "" }])', type: 'json' },
      { name: 'tickerItems', label: 'Ticker Items (JSON array)', type: 'json' },
    ],
  },
  {
    key: 'about-section', label: 'About Section (Home + About page)', api: '/about-section',
    fields: [
      { name: 'subheading', label: 'Small Badge Label (e.g. "Top choice for cosmetic surgery treatments")', type: 'text' },
      { name: 'heading', label: 'Main Heading', type: 'text' },
      { name: 'description', label: 'Intro Description', type: 'textarea' },
      { name: 'images', label: 'Photos', type: 'imageArray' },
      { name: 'badgeText', label: 'Floating Badge Text (short, sits on the photo)', type: 'text' },
      { name: 'highlights', label: 'Highlight Chips (JSON array: icon + text)', type: 'json' },
      { name: 'whoWeAreHeading', label: 'Who We Are - Heading', type: 'text' },
      { name: 'whoWeAreDescription', label: 'Who We Are - Description', type: 'textarea' },
      { name: 'missionHeading', label: 'Our Mission - Heading', type: 'text' },
      { name: 'missionDescription', label: 'Our Mission - Description', type: 'textarea' },
      { name: 'visionHeading', label: 'Our Vision - Heading', type: 'text' },
      { name: 'visionDescription', label: 'Our Vision - Description', type: 'textarea' },
    ],
  },
  {
    key: 'who-we-are', label: 'Who We Are', api: '/who-we-are',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Left Photo (with play button)', type: 'image' },
      { name: 'imageSecondary', label: 'Right Photo', type: 'image' },
      { name: 'features', label: 'Feature Items (JSON array)', type: 'json' },
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
];