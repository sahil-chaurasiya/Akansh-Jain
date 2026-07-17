// Seeds realistic sample content into every collection so the site and admin panel are
// populated end-to-end instead of empty. Safe to re-run: it clears each collection it
// touches first, then re-inserts, EXCEPT AdminUser (never touched here — use `npm run
// seed:admin` separately for login credentials).
//
// Usage:  node src/utils/seedData.js
// (reads MONGO_URI from .env, same as the rest of the app)
//
// Image fields reference the original template's own images, which already live in
// client/public/assets/img and are served by the Vite dev server / static build at those
// same paths — so no Cloudinary upload is required just to see a fully populated site.
// Swap any of these for real Cloudinary { url, publicId } objects from the admin panel
// whenever you're ready to replace placeholder imagery.
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';

import SiteSettings from '../models/SiteSettings.js';
import NavItem from '../models/NavItem.js';
import Slide from '../models/Slide.js';
import AboutSection from '../models/AboutSection.js';
import Service from '../models/Service.js';
import WhoWeAre from '../models/WhoWeAre.js';
import HowItWorkStep from '../models/HowItWorkStep.js';
import BookingSection from '../models/BookingSection.js';
import Testimonial from '../models/Testimonial.js';
import GalleryItem from '../models/GalleryItem.js';
import BrandLogo from '../models/BrandLogo.js';
import Post from '../models/Post.js';
import TeamMember from '../models/TeamMember.js';
import PricingPlan from '../models/PricingPlan.js';
import Project from '../models/Project.js';
import FaqItem from '../models/FaqItem.js';
import ContactInfo from '../models/ContactInfo.js';
import PageMeta from '../models/PageMeta.js';

const img = (path) => ({ url: path, publicId: '' });

const run = async () => {
  await connectDB();
  console.log('Seeding Lustre content...');

  // ---------- Singletons ----------
  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    logo: img('/assets/img/logo/logo.png'),
    logoAlt: img('/assets/img/logo/f_logo.png'),
    topContactPhone: '(406) 555-0120',
    topContactEmail: 'hello@lustreclinic.com',
    topContactAddress: '6391 Elgin St. Celina, Delaware 10299',
    headerCtaText: 'Get Appointment',
    headerCtaLink: '/contact',
    copyrightText: "Copyright © Lustre Plastic Surgery 2026. All Rights Reserved",
    footerColumns: [
      {
        heading: 'Quick Links',
        order: 1,
        links: [
          { label: 'About Us', url: '/about' },
          { label: 'Our Services', url: '/services' },
          { label: 'Gallery', url: '/projects' },
          { label: 'Pricing', url: '/pricing' },
        ],
      },
      {
        heading: 'Support',
        order: 2,
        links: [
          { label: 'FAQ', url: '/faq' },
          { label: 'Contact Us', url: '/contact' },
          { label: 'Blog', url: '/blog' },
          { label: 'Our Team', url: '/team' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com', icon: 'fa-brands fa-facebook-f' },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'fa-brands fa-instagram' },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'fa-brands fa-twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'fa-brands fa-linkedin-in' },
    ],
    tickerItems: [
      { text: 'Board Certified Surgeons', order: 1 },
      { text: 'Safe & Modern Facilities', order: 2 },
      { text: '2,000+ Happy Clients', order: 3 },
      { text: 'Personalized Care Plans', order: 4 },
    ],
  });

  await AboutSection.deleteMany({});
  await AboutSection.create({
    heading: 'Transform Your Look With Precision',
    subheading: 'About Lustre',
    description:
      'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, and reshaping the body. Our board-certified surgeons combine artistry with advanced surgical technique to deliver natural, lasting results tailored to every patient.',
    images: [img('/assets/img/features/about-img-01.png'), img('/assets/img/features/about-img-02.png')],
    stats: [
      { label: 'Years Experience', value: '15+', icon: '' },
      { label: 'Happy Clients', value: '2,000+', icon: '' },
      { label: 'Procedures Offered', value: '30+', icon: '' },
    ],
  });

  await WhoWeAre.deleteMany({});
  await WhoWeAre.create({
    heading: 'Safe Procedures, Beautiful Lasting Results',
    description:
      'From consultation to recovery, every step is guided by board-certified specialists using modern, minimally invasive techniques in fully accredited facilities.',
    image: img('/assets/img/bg/who-are-img-01.png'),
    features: [
      { icon: '', title: 'Transforming Faces With Precision', description: '', order: 1 },
      { icon: '', title: 'Discover Confidence Through Surgery', description: '', order: 2 },
      { icon: '', title: 'Redefine Beauty With Confidence', description: '', order: 3 },
      { icon: '', title: 'Youthful Appearance Made Possible', description: '', order: 4 },
    ],
  });

  await BookingSection.deleteMany({});
  await BookingSection.create({
    heading: 'Get an Appointment',
    description: 'Tell us a little about what you\'re looking for and our patient care team will follow up within one business day.',
    image: img('/assets/img/bg/booking-img.png'),
  });

  await ContactInfo.deleteMany({});
  await ContactInfo.create({
    address: '6391 Elgin St. Celina, Delaware 10299',
    phone: '(603) 555-0123',
    email: 'hello@lustreclinic.com',
    officeHours: 'Mon - Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.1!2d-75.5!3d39.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
  });

  // ---------- Nav ----------
  await NavItem.deleteMany({});
  await NavItem.insertMany([
    { label: 'Home', link: '/', order: 1 },
    { label: 'About Us', link: '/about', order: 2 },
    { label: 'Services', link: '/services', order: 3 },
    { label: 'Gallery', link: '/projects', order: 4 },
    { label: 'Pricing', link: '/pricing', order: 5 },
    { label: 'Team', link: '/team', order: 6 },
    { label: 'Blog', link: '/blog', order: 7 },
    { label: 'Faq', link: '/faq', order: 8 },
    { label: 'Contact Us', link: '/contact', order: 9 },
  ]);

  // ---------- Slides ----------
  await Slide.deleteMany({});
  await Slide.insertMany([
    {
      image: img('/assets/img/slider/header-bg.png'),
      headline: 'Transforming Look Changing Lives',
      subheading: 'Plastic surgery is a specialized medical field that focuses on enhancing and restoring function through surgical and non-surgical techniques.',
      ctaText: 'Get Appointment',
      ctaLink: '/contact',
      page: 'home',
      order: 1,
    },
    {
      image: img('/assets/img/slider/header-bg.png'),
      headline: 'Confidence Begins With A Change',
      subheading: 'Our board-certified surgeons combine precision and artistry to help you look and feel your best.',
      ctaText: 'Book a Consultation',
      ctaLink: '/contact',
      page: 'home',
      order: 2,
    },
    {
      image: img('/assets/img/slider/header-bg-02.png'),
      headline: 'Beauty, Backed By Board-Certified Surgeons',
      subheading: 'Safe, modern facilities and personalized care plans for every patient.',
      ctaText: 'Get Appointment',
      ctaLink: '/contact',
      page: 'home2',
      order: 1,
    },
  ]);

  // ---------- Services ----------
  await Service.deleteMany({});
  const serviceDefs = [
    ['Facelift Rejuvenation Surgery', 'facelift-rejuvenation-surgery', 'A surgical procedure that reduces visible signs of aging in the face and neck.', 'sr-icon-01'],
    ['Rhinoplasty (Nose Reshaping)', 'rhinoplasty-nose-reshaping', 'Reshapes the nose to improve appearance and, in some cases, breathing function.', 'sr-icon-02'],
    ['Breast Augmentation', 'breast-augmentation', 'Enhances breast size and shape using implants or fat transfer.', 'sr-icon-03'],
    ['Liposuction Body Contouring', 'liposuction-body-contouring', 'Removes stubborn fat deposits to refine and contour the body.', 'sr-icon-04'],
    ['Tummy Tuck (Abdominoplasty)', 'tummy-tuck-abdominoplasty', 'Removes excess skin and tightens abdominal muscles for a firmer profile.', 'sr-icon-05'],
    ['Eyelid Surgery (Blepharoplasty)', 'eyelid-surgery-blepharoplasty', 'Removes excess eyelid skin for a more refreshed, youthful appearance.', 'sr-icon-06'],
  ];
  for (let i = 0; i < serviceDefs.length; i++) {
    const [title, slug, shortDesc, iconBase] = serviceDefs[i];
    await Service.create({
      title,
      slug,
      shortDesc,
      icon: `/assets/img/icon/${iconBase}.png`,
      image: img(`/assets/img/bg/services-0${(i % 9) + 1}.png`),
      order: i + 1,
      bodyContent: `<p>${shortDesc} Our specialists begin with a full consultation to understand your goals, walk you through every step of the procedure, and build a personalized recovery plan so you know exactly what to expect.</p><p>Most patients return to light activity within one to two weeks, with final results visible over the following months as swelling resolves.</p>`,
      gallery: [img('/assets/img/bg/services-deatils-img-01.png')],
      metaTitle: `${title} - Lustre`,
      metaDescription: shortDesc,
    });
  }

  // ---------- How it works ----------
  await HowItWorkStep.deleteMany({});
  await HowItWorkStep.insertMany([
    { stepNumber: '01', title: 'Consultation & Assessment', description: 'Meet with a surgeon to discuss your goals and medical history.', order: 1 },
    { stepNumber: '02', title: 'Personalized Treatment Planning', description: 'We build a plan tailored to your anatomy and desired outcome.', order: 2 },
    { stepNumber: '03', title: 'Safe Surgery Procedure', description: 'Your procedure is performed in an accredited, modern facility.', order: 3 },
    { stepNumber: '04', title: 'Recovery & Follow-Up', description: 'Ongoing check-ins ensure a smooth, well-supported recovery.', order: 4 },
  ]);

  // ---------- Testimonials ----------
  await Testimonial.deleteMany({});
  await Testimonial.insertMany([
    { name: 'Amelia Carter', role: 'Facelift Patient', photo: img('/assets/img/testimonial/testi_avatar.png'), quote: 'The entire team made me feel comfortable from the first consultation through recovery. The results look completely natural.', rating: 5, order: 1 },
    { name: 'Daniel Reyes', role: 'Rhinoplasty Patient', photo: img('/assets/img/testimonial/testi_avatar_02.png'), quote: 'I finally feel confident in photos. My surgeon listened carefully to what I wanted and delivered exactly that.', rating: 5, order: 2 },
    { name: 'Priya Nair', role: 'Tummy Tuck Patient', photo: img('/assets/img/testimonial/testi_avatar_03.png'), quote: 'Recovery was easier than I expected thanks to the detailed aftercare plan and the staff checking in constantly.', rating: 5, order: 3 },
  ]);

  // ---------- Gallery ----------
  await GalleryItem.deleteMany({});
  const galleryImgs = ['galler-h2-01', 'galler-h2-02', 'galler-h2-03', 'galler-h2-04', 'galler-h2-05', 'galler-h2-06'];
  await GalleryItem.insertMany(
    galleryImgs.map((name, i) => ({
      image: img(`/assets/img/gallery/${name}.png`),
      category: i % 2 === 0 ? 'Facial' : 'Body',
      order: i + 1,
    }))
  );

  // ---------- Brand logos ----------
  await BrandLogo.deleteMany({});
  await BrandLogo.insertMany([1, 2, 3, 4, 5].map((n) => ({ image: img(`/assets/img/brand/b-logo${n}.png`), link: '#', order: n })));

  // ---------- Blog posts ----------
  await Post.deleteMany({});
  const postDefs = [
    ['5 Things to Know Before Your First Consultation', 'things-to-know-before-first-consultation', 'inner_b1', 'What to prepare, what to ask, and how to choose the right procedure for your goals.'],
    ['Understanding Recovery Timelines After Facial Surgery', 'understanding-recovery-timelines-facial-surgery', 'inner_b2', 'A realistic week-by-week look at healing after common facial procedures.'],
    ['Non-Surgical vs Surgical: How to Choose', 'non-surgical-vs-surgical-how-to-choose', 'inner_b3', 'Comparing minimally invasive options against traditional surgery.'],
    ['Caring For Your Skin After a Procedure', 'caring-for-your-skin-after-a-procedure', 'inner_b4', 'Post-op skincare tips from our clinical team.'],
    ['Board Certification: Why It Matters', 'board-certification-why-it-matters', 'inner_b5', 'What board certification actually verifies, and how to check a surgeon\'s credentials.'],
  ];
  for (let i = 0; i < postDefs.length; i++) {
    const [title, slug, image, excerpt] = postDefs[i];
    await Post.create({
      title,
      slug,
      coverImage: img(`/assets/img/blog/${image}.jpg`),
      author: 'Dr. Lauren Mitchell',
      category: i % 2 === 0 ? 'Guides' : 'Recovery',
      tags: ['surgery', 'wellness', i % 2 === 0 ? 'consultation' : 'aftercare'],
      excerpt,
      body: `<p>${excerpt}</p><p>Every patient's journey is different, which is why our clinical team spends real time on education before any procedure is scheduled. This article walks through what our own patients most often ask during consultation.</p><h3>Key takeaways</h3><ul><li>Ask about your surgeon's specific board certifications</li><li>Understand realistic recovery timelines up front</li><li>Follow your personalized aftercare plan closely</li></ul>`,
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
      metaTitle: `${title} - Lustre Blog`,
      metaDescription: excerpt,
    });
  }

  // ---------- Team ----------
  await TeamMember.deleteMany({});
  const teamDefs = [
    ['Dr. Lauren Mitchell', 'dr-lauren-mitchell', 'Lead Plastic Surgeon', 'team-img1'],
    ['Dr. Marcus Chen', 'dr-marcus-chen', 'Facial Reconstruction Specialist', 'team-img2'],
    ['Dr. Sofia Alvarez', 'dr-sofia-alvarez', 'Body Contouring Surgeon', 'team-img3'],
    ['Dr. James Whitfield', 'dr-james-whitfield', 'Reconstructive Surgeon', 'team-img4'],
  ];
  for (let i = 0; i < teamDefs.length; i++) {
    const [name, slug, role, photo] = teamDefs[i];
    await TeamMember.create({
      photo: img(`/assets/img/team/${photo}.jpg`),
      name,
      role,
      slug,
      bio: `${name} is a board-certified surgeon with over a decade of experience in ${role.toLowerCase()}, known for a meticulous, patient-first approach to every consultation and procedure.`,
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
        { platform: 'Instagram', url: 'https://instagram.com' },
      ],
      order: i + 1,
    });
  }

  // ---------- Pricing ----------
  await PricingPlan.deleteMany({});
  await PricingPlan.insertMany([
    {
      name: 'Essential Consultation',
      price: 99,
      billingPeriod: 'session',
      features: [
        { text: 'In-depth consultation', included: true },
        { text: 'Personalized treatment plan', included: true },
        { text: 'Follow-up call', included: false },
      ],
      isPopular: false,
      ctaText: 'Book Now',
      ctaLink: '/contact',
      order: 1,
    },
    {
      name: 'Complete Care Package',
      price: 249,
      billingPeriod: 'session',
      features: [
        { text: 'In-depth consultation', included: true },
        { text: 'Personalized treatment plan', included: true },
        { text: '3D imaging preview', included: true },
        { text: 'Follow-up call', included: true },
      ],
      isPopular: true,
      ctaText: 'Book Now',
      ctaLink: '/contact',
      order: 2,
    },
    {
      name: 'VIP Priority Care',
      price: 499,
      billingPeriod: 'session',
      features: [
        { text: 'Everything in Complete Care', included: true },
        { text: 'Priority scheduling', included: true },
        { text: 'Dedicated care coordinator', included: true },
        { text: 'Post-op concierge visits', included: true },
      ],
      isPopular: false,
      ctaText: 'Book Now',
      ctaLink: '/contact',
      order: 3,
    },
  ]);

  // ---------- Projects ----------
  await Project.deleteMany({});
  const projectDefs = [
    ['Facial Rejuvenation Case Study', 'facial-rejuvenation-case-study', 'Facial', 'protfolio-img06'],
    ['Body Contouring Transformation', 'body-contouring-transformation', 'Body', 'protfolio-img07'],
    ['Rhinoplasty Result Highlight', 'rhinoplasty-result-highlight', 'Facial', 'protfolio-img08'],
    ['Post-Surgical Recovery Story', 'post-surgical-recovery-story', 'Body', 'protfolio-img09'],
  ];
  for (let i = 0; i < projectDefs.length; i++) {
    const [title, slug, category, image] = projectDefs[i];
    await Project.create({
      image: img(`/assets/img/gallery/${image}.png`),
      title,
      category,
      description: `An overview of a real patient outcome in the ${category.toLowerCase()} category, shared with permission to help future patients understand what to expect.`,
      slug,
      gallery: [img(`/assets/img/gallery/${image}.png`)],
      order: i + 1,
    });
  }

  // ---------- FAQ ----------
  await FaqItem.deleteMany({});
  await FaqItem.insertMany([
    { question: 'How do I know if I\'m a good candidate for surgery?', answer: 'A consultation with one of our board-certified surgeons is the best way to evaluate your goals, health history, and options.', page: 'faq', order: 1 },
    { question: 'What is the typical recovery time?', answer: 'Recovery varies by procedure — most patients return to light activity within 1-2 weeks, with full results visible over several months.', page: 'faq', order: 2 },
    { question: 'Is financing available?', answer: 'Yes, we offer several financing plans. Our patient care team can walk you through options during your consultation.', page: 'faq', order: 3 },
    { question: 'Do you offer non-surgical options?', answer: 'Yes — many of our services include both surgical and non-surgical approaches depending on your goals.', page: 'services', order: 1 },
    { question: 'How experienced is your surgical team?', answer: 'Our lead surgeons each have over a decade of board-certified experience across facial, body, and reconstructive procedures.', page: 'team', order: 1 },
  ]);

  // ---------- Page meta (SEO) ----------
  await PageMeta.deleteMany({});
  await PageMeta.insertMany([
    { pageKey: 'home', title: 'Lustre - Plastic Surgery & Aesthetic Care', metaDescription: 'Board-certified plastic surgery and aesthetic care focused on safe, natural, lasting results.' },
    { pageKey: 'about', title: 'About Us - Lustre', metaDescription: 'Learn about our board-certified surgical team and patient-first philosophy.' },
    { pageKey: 'services', title: 'Services - Lustre', metaDescription: 'Explore our full range of surgical and non-surgical procedures.' },
    { pageKey: 'projects', title: 'Gallery - Lustre', metaDescription: 'Real patient outcomes and before/after results.' },
    { pageKey: 'team', title: 'Our Team - Lustre', metaDescription: 'Meet our board-certified surgeons and clinical staff.' },
    { pageKey: 'pricing', title: 'Pricing - Lustre', metaDescription: 'Consultation and care package pricing.' },
    { pageKey: 'blog', title: 'Blog - Lustre', metaDescription: 'Guides and insights from our clinical team.' },
    { pageKey: 'faq', title: 'FAQ - Lustre', metaDescription: 'Answers to common questions about procedures, recovery, and financing.' },
    { pageKey: 'contact', title: 'Contact Us - Lustre', metaDescription: 'Get in touch to schedule a consultation.' },
  ]);

  console.log('Seed complete:');
  console.log(`  Services: ${await Service.countDocuments()}`);
  console.log(`  Posts: ${await Post.countDocuments()}`);
  console.log(`  Team members: ${await TeamMember.countDocuments()}`);
  console.log(`  Pricing plans: ${await PricingPlan.countDocuments()}`);
  console.log(`  Projects: ${await Project.countDocuments()}`);
  console.log(`  Testimonials: ${await Testimonial.countDocuments()}`);
  console.log(`  Gallery items: ${await GalleryItem.countDocuments()}`);
  console.log(`  FAQ items: ${await FaqItem.countDocuments()}`);
  console.log(`  Slides: ${await Slide.countDocuments()}`);
  console.log(`  Nav items: ${await NavItem.countDocuments()}`);
  console.log(`  Brand logos: ${await BrandLogo.countDocuments()}`);
  console.log(`  How-it-work steps: ${await HowItWorkStep.countDocuments()}`);
  console.log(`  Page meta rows: ${await PageMeta.countDocuments()}`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});