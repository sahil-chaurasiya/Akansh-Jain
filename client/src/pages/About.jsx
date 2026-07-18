import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './about-premium.css';
import './premium-sections.css';
import './profile-credentials.css';

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
  const [activeTesti, setActiveTesti] = useState(0);

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
      <PageMeta pageKey="about" fallbackTitle="About Us - Natural Cosmetic Surgery Centre" />
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

      {/* Academic Profile / Expertise / Achievements / Publications / Awards / Presentation */}
      <section className="pc-scope">
        <div className="container">
          <div className="pc-row">
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".1s">
              <h3>{about?.academicProfileHeading || 'Academic Profile'}</h3>
              <p className="pc-text">{about?.academicProfileText}</p>
            </div>
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
              <h3>{about?.expertiseHeading || 'Expertise In Plastic Surgery'}</h3>
              {about?.expertiseSubtext && <p className="pc-subtext">{about.expertiseSubtext}</p>}
              <div className="pc-stat-grid">
                {(about?.expertiseStats || []).map((s, i) => (
                  <div className="pc-stat" key={i}>
                    <h4>{s.number}</h4>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pc-row">
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".1s">
              <h3>{about?.achievementsHeading || 'Achievements and Fellowship'}</h3>
              <ul className="pc-list">
                {(about?.achievementsItems || []).map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
              <h3>{about?.publicationsHeading || 'Publications And Presentation'}</h3>
              <ul className="pc-list">
                {(about?.publicationsItems || []).map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pc-row">
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".1s">
              <h3>{about?.awardsHeading || 'Awards'}</h3>
              <ul className="pc-list">
                {(about?.awardsItems || []).map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pc-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
              <h3>{about?.presentationHeading || 'Presentation'}</h3>
              <ul className="pc-list">
                {(about?.presentationItems || []).map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="about-testi-premium">
          <div className="container">
            <div className="atp-header wow fadeInUp animated" data-animation="fadeInUp" data-delay=".1s">
              <h2 className="text-anime-style-3">{about?.testimonialsHeading || 'Testimonials - Happy Clients'}</h2>
            </div>
            <div className="atp-grid">
              <div className="atp-quote-card wow fadeInUp animated" data-animation="fadeInUp" data-delay=".2s">
                <span className="atp-quote-mark">&ldquo;</span>
                <p className="atp-quote-text">{testimonials[activeTesti]?.quote}</p>
                <div className="atp-quote-footer">
                  <h5>{testimonials[activeTesti]?.name}</h5>
                  {testimonials[activeTesti]?.role ? <span>{testimonials[activeTesti].role}</span> : null}
                  <div className="atp-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={i < (testimonials[activeTesti]?.rating || 5) ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                      ></i>
                    ))}
                  </div>
                </div>
                {testimonials.length > 1 && (
                  <div className="atp-dots">
                    {testimonials.map((t, i) => (
                      <button
                        key={t._id}
                        type="button"
                        className={`atp-dot${i === activeTesti ? ' active' : ''}`}
                        aria-label={`Show testimonial from ${t.name}`}
                        onClick={() => setActiveTesti(i)}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
              <div className="atp-platforms wow fadeInUp animated" data-animation="fadeInUp" data-delay=".35s">
                <h4>{about?.testimonialsSubheading || '#1 Choice of Patients for Aesthetics & Plastic Surgery'}</h4>
                <ul>
                  {(about?.reviewPlatforms?.length
                    ? about.reviewPlatforms
                    : [
                        { name: 'Google', countText: '300+ Reviews', icon: 'fa-brands fa-google', link: '#' },
                        { name: 'Practo', countText: '30+ Reviews', icon: 'fa-solid fa-notes-medical', link: '#' },
                        { name: 'Facebook', countText: '5K+ Followers', icon: 'fa-brands fa-facebook-f', link: '#' },
                      ]
                  ).map((p, i) => (
                    <li key={i}>
                      <span className="atp-p-icon">
                        <i className={p.icon || 'fa-solid fa-star'}></i>
                      </span>
                      <div className="atp-p-text">
                        <h6>{p.name}</h6>
                        <a href={p.link || '#'} target="_blank" rel="noreferrer" className="atp-p-count">
                          {p.countText}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}