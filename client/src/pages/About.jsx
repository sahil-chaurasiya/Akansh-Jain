import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './about-premium.css';

const DEFAULT_HIGHLIGHTS = [
  { icon: 'fa-solid fa-user-doctor', text: 'Board-Certified Surgeons' },
  { icon: 'fa-solid fa-house-medical', text: 'Modern, Safe Facilities' },
  { icon: 'fa-solid fa-heart-pulse', text: 'Personalized Care Plans' },
  { icon: 'fa-solid fa-user-shield', text: 'Privacy & Comfort First' },
];

export default function About() {
  const [about, setAbout] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/about-section'), api.get('/testimonials?limit=3')])
      .then(([a, testi]) => {
        setAbout(a.data.data);
        setTestimonials(testi.data.data);
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [about]);

  return (
    <Layout>
      <PageMeta pageKey="about" fallbackTitle="About Us - Lustre" />
      <Breadcrumb title="About" />

      <section id="about" className="about-area about-p pt-150 pb-150 p-relative fix mv-scope">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="about-hero-frame wow fadeInLeft animated" data-animation="fadeInLeft" data-delay=".4s">
                <div className="about-hero-frame-accent"></div>
                <div className="img">
                  <img src={about?.images?.[0]?.url || '/assets/img/features/about-img-01.png'} alt="img" />
                </div>
                <div className="about-hero-badge">
                  <i className="fa-solid fa-award"></i>
                  <span>{about?.badgeText || 'Certified Excellence in Care'}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="about-content s-about-content pl-20 wow fadeInRight animated" data-animation="fadeInRight" data-delay=".4s">
                <div className="about-title second-title pb-25">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.png" alt="img" />
                    </span>{' '}
                    {about?.subheading || 'About Us'}
                  </h5>
                  <h2 className="text-anime-style-3">{about?.heading || 'Transform Your Look With Precision'}</h2>
                </div>
                <p className="pline">{about?.description || 'Plastic surgery is a specialized branch of medicine focused on restoring, enhancing, and reshaping the body.'}</p>

                <div className="about-highlights">
                  {(about?.highlights?.length ? about.highlights : DEFAULT_HIGHLIGHTS).map((h, i) => (
                    <div className="about-highlight-chip" key={i}>
                      <i className={h.icon || 'fa-solid fa-circle-check'}></i>
                      <span>{h.text}</span>
                    </div>
                  ))}
                </div>

                <div className="about-outer-btn pl-20 mt-20">
                  <Link to="/contact" className="btn mr-15">
                    Book a Consultation <i className="fa-light fa-arrow-right-long"></i>
                  </Link>
                  <Link to="/services" className="about-secondary-link">
                    Explore Our Services <i className="fa-light fa-arrow-right-long"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mv-scope">
        {/* Who We Are */}
        <section className="who-we-are-area">
          <div className="container">
            <div className="who-we-are-inner wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
              <span className="badge-label">Who We Are</span>
              <h2 className="text-anime-style-3">{about?.whoWeAreHeading || 'A Dedicated Plastic Surgery Centre'}</h2>
              <p>
                {about?.whoWeAreDescription ||
                  'Naturals Cosmetic Surgery Centre is a dedicated plastic surgery centre committed to helping you achieve your aesthetic goals with precision and care. Our approach combines advanced techniques with a deep understanding of individual beauty, ensuring that every procedure is tailored to your unique needs. With years of experience in the field, we strive to create a comfortable and supportive environment where you can feel confident and informed throughout your journey.'}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision-area">
          <div className="container">
            <div className="mv-grid">
              <div className="mv-card mission wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
                <span className="mv-index">01</span>
                <div className="mv-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="mv-underline"></div>
                <h3>{about?.missionHeading || 'Our Mission'}</h3>
                <p>
                  {about?.missionDescription ||
                    'To deliver exceptional care in plastic, cosmetic, and reconstructive surgery by integrating state-of-the-art techniques with compassionate, personalized service. We are dedicated to helping individuals achieve their aesthetic and functional aspirations in a safe, respectful, and professional setting.'}
                </p>
              </div>
              <div className="mv-card vision wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                <span className="mv-index">02</span>
                <div className="mv-icon">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <div className="mv-underline"></div>
                <h3>{about?.visionHeading || 'Our Vision'}</h3>
                <p>
                  {about?.visionDescription ||
                    'To be a distinguished leader in the field of plastic and cosmetic surgery, renowned for innovation, unparalleled patient satisfaction, and remarkable surgical results, while inspiring confidence and enhancing the overall well-being of every individual we serve.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="testimonial-area pt-150 pb-120 p-relative fix">
        <div className="container">
          <div className="row">
            {testimonials.map((t) => (
              <div className="col-lg-4 col-md-6" key={t._id}>
                <div className="testimonial-box mb-30">
                  <p>{t.quote}</p>
                  <h5 className="mt-15 mb-0">{t.name}</h5>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}