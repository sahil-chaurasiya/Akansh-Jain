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
    // ---- "Meet Dr." hero block (right side of the top of the /about page).
    // Replaces the old heading/description pair below, which the page no longer reads.
    // Separate new fields (instead of reusing heading/description) so the new content shows up
    // immediately on existing databases, whatever the old fields contain.
    // In bioText, a blank line starts a new paragraph and **double asterisks** make text bold.
    bioLabel: { type: String, default: 'About Us' },
    bioHeading: { type: String, default: 'Meet Dr. Aakansh Jain' },
    // Shown in brackets right beside the heading. Type it WITHOUT the brackets — they're added
    // automatically. Clear it to hide.
    bioTagline: {
      type: String,
      default: 'Cosmetic and plastic and reconstructive surgeon with special interest in hand and micro surgery',
    },
    bioText: {
      type: String,
      default: `Dr. Aakansh Jain, is a passionate, perfectionist and jovial cosmetic and plastic surgeon. He loves to interact with his patients with compassion and empathy. His journey started to become a doctor in his 9th class when he suffered from jaundice and had witnessed the pain of patients when diagnosis went wrong and the joy of being treated successfully. The incident sowed a seed of passion for this noble profession. He dedicated his senior secondary classes to prepare for this dream and to get into the prestigious medical colleges of India. Due to scarcity of medical seats at that time there were times when he lost hopes but at last he made it to vardhaman mahavir medical college, newdelhi. He is the kind of person who never enjoyed classroom lectures but loved bedside teachings and practicals. Due to his nature he learned practical medicine more than theory and had wonderful memories of evening rounds, patient interaction and surgical procedures during his mbbs days.

He was influenced by his Social science teacher who later became an IAS officer, so he started preparation for civil services during his internship but never got over from love for surgery so continued his journey in the medical field. He got selected to pursue general surgery in ram manohar lohia hospital where he learned and researched his thesis on kidney transplantation along with other general surgical procedures. During his residency in general surgery he found his love for plastic and reconstructive surgery. So to evolve in his love he joined the Plastic and reconstructive department of AIIMS Bhopal. And Later selected for MCh course in plastic and reconstructive surgery in prestigious institute King george’s medical university,lucknow.

During his residency he dedicated his time in learning all nuances of reconstructive surgery but also the suffering of burn patient/trauma patients and to help them through his surgical skills he travelled to Ganga hospital, coimbatore utilising his whole year casual leaves to hone his skills. Also during his residency he developed various surgical instruments and techniques which he later published. His motto inspired by Dr. Sabhapathy, chairman of Ganga hospital, “give them (patients) the best surgical care (of the world) at their affordable price”.

Later he went to learn more in aesthetic surgery he went to Dr. Roy Kanjoor’s cosmetic surgery centre, coimbatore and did fellowship under him (2024). He was selected for an international travel fellowship to Vancouver ,Canada by american society for surgery of hand (ASSH) in 2025. Now continuing to serve people of both aesthetic and reconstruction needs.`,
    },
    // Optional bold closing line under the bio (e.g. "Dr. Aakansh Jain, Plastic & Cosmetic Surgeon").
    bioSignature: { type: String, default: '' },

    // Legacy hero fields — no longer shown on the page (replaced by the bio* fields above).
    // Kept so any existing saved values aren't lost.
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    images: [{ url: String, publicId: String }],
    highlights: [highlightItemSchema],
    badgeText: { type: String, default: '' },
    whoWeAreHeading: { type: String, default: '' },
    whoWeAreDescription: { type: String, default: '' },
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

    // ---- /about page: featured video(s) + reels strip (managed from the admin panel).
    // featuredVideoUrls: YouTube / Vimeo links (or a direct .mp4 link), one per item.
    featuredVideoHeading: { type: String, default: 'Watch & Listen' },
    featuredVideoSubheading: { type: String, default: '' },
    featuredVideoUrls: { type: [String], default: () => [] },
    reelsHeading: { type: String, default: 'Our Reels' },
    reelsSubheading: { type: String, default: 'Watch our latest reels' },

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