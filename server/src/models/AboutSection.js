import mongoose from 'mongoose';

const highlightItemSchema = new mongoose.Schema(
  { icon: String, text: String },
  { _id: false }
);

const reviewPlatformSchema = new mongoose.Schema(
  { name: String, countText: String, icon: String, link: String },
  { _id: false }
);

const statItemSchema = new mongoose.Schema(
  { number: String, label: String },
  { _id: false }
);

const aboutSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    images: [{ url: String, publicId: String }],
    highlights: [highlightItemSchema],
    badgeText: { type: String, default: '' },
    whoWeAreHeading: { type: String, default: '' },
    whoWeAreDescription: { type: String, default: '' },
    missionHeading: { type: String, default: '' },
    missionDescription: { type: String, default: '' },
    visionHeading: { type: String, default: '' },
    visionDescription: { type: String, default: '' },
    testimonialsHeading: { type: String, default: 'Testimonials - Happy Clients' },
    testimonialsSubheading: { type: String, default: '#1 Choice of Patients for Aesthetics & Plastic Surgery' },
    reviewPlatforms: {
      type: [reviewPlatformSchema],
      default: () => [
        { name: 'Google', countText: '300+ Reviews', icon: 'fa-brands fa-google', link: '#' },
        { name: 'Practo', countText: '30+ Reviews', icon: 'fa-solid fa-notes-medical', link: '#' },
        { name: 'Facebook', countText: '5K+ Followers', icon: 'fa-brands fa-facebook-f', link: '#' },
      ],
    },

    // ---- Profile / Credentials sections (Academic Profile, Expertise, Achievements,
    // Publications, Awards, Presentations). Every list below is a plain array of strings
    // (or simple {number,label} pairs) so the admin panel can edit them as "one per line"
    // text instead of JSON.
    academicProfileHeading: { type: String, default: 'Academic Profile' },
    academicProfileText: {
      type: String,
      default:
        'Our lead surgeon has a very successful record of academic achievement, earning advanced qualifications from leading medical colleges, along with specialisation in Plastic Surgery. This training is regarded as a benchmark of excellence in the field.',
    },

    expertiseHeading: { type: String, default: 'Expertise In Plastic Surgery' },
    expertiseSubtext: { type: String, default: 'Carried out following operations with 100% success rate:' },
    expertiseStats: {
      type: [statItemSchema],
      default: () => [
        { number: '7,000+', label: 'Gynecomastia' },
        { number: '5,000+', label: 'Hair Transplantation' },
        { number: '2,000+', label: 'Botox and Fillers' },
        { number: '900+', label: 'Tummy Tuck' },
        { number: '1,700+', label: 'Breast Surgeries' },
        { number: '1,300+', label: 'Liposuction' },
        { number: '750+', label: 'Female Rejuvenation Surgery' },
      ],
    },

    achievementsHeading: { type: String, default: 'Achievements and Fellowship' },
    achievementsItems: {
      type: [String],
      default: () => [
        'Fellowship trained in advanced cosmetic and reconstructive surgery procedures',
        'Trained in Face Lift and other face procedures, and Breast cosmetic procedures',
        'Trained in endoscopic face procedures, endoscopic buttock and calf implants',
        'Visited leading institutes abroad to learn advanced rhinoplasty and body contouring',
      ],
    },

    publicationsHeading: { type: String, default: 'Publications And Presentation' },
    publicationsItems: {
      type: [String],
      default: () => [
        'Wound debridement therapy - Review Article, Annals of Plastic Surgery',
        'A study of regional nerve blocks and local anaesthetic creams for donor sites in burn patients',
        'Evaluation of fundus first laparoscopic cholecystectomy',
        'The versatile medial plantar artery and its flaps, Annals of Plastic Surgery',
      ],
    },

    awardsHeading: { type: String, default: 'Awards' },
    awardsItems: {
      type: [String],
      default: () => [
        'Best All Round Medical Graduate',
        'Best Contributor to the Corporate Life of the College',
        'Silver Medal - in the subject of Gynecology and Obstetrics',
        'University Distinction Holder - in the subject of Microbiology',
      ],
    },

    presentationHeading: { type: String, default: 'Presentation' },
    presentationItems: {
      type: [String],
      default: () => [
        'Paper presented on management of severely protruding premaxilla in bilateral cleft lip at an International Conference',
        'Presented poster on laparoscopic cholecystectomy at an International Conference of GI Surgeons',
        'Presented poster on tropical pyomyositis at a Chapter meeting of the Association of Surgeons',
        'Participated in a population control debate held at a Department of Obstetrics conference',
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model('AboutSection', aboutSectionSchema);