import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import { openWhatsApp } from '../lib/whatsapp.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './home-blog.css';
import './dr-hero.css';
import './dr-booking.css';
import './home-booking-info.css';
import './service-categories.css';
import './home-about-buttons.css';
import { SERVICE_CATEGORIES } from '../lib/serviceCategories.js';

export default function Home() {
  const [data, setData] = useState({
    slides: [], homeAbout: null, services: [], bookingInfo: null,
    howItWork: [], bookingSection: null, testimonials: [],
    gallery: [], posts: [], settings: null, gallerySection: null,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/slides?page=home'),
      api.get('/home-about-section'),
      api.get('/services'),
      api.get('/booking-info-section'),
      api.get('/how-it-work-steps'),
      api.get('/booking-section'),
      api.get('/testimonials'),
      api.get('/gallery-items?limit=6'),
      api.get('/posts'),
      api.get('/gallery-section'),
    ])
      .then(([slides, homeAbout, services, bookingInfo, how, booking, testi, gallery, posts, gallerySection]) => {
        setData({
          slides: slides.data.data,
          homeAbout: homeAbout.data.data,
          services: services.data.data,
          bookingInfo: bookingInfo.data.data,
          howItWork: how.data.data,
          bookingSection: booking.data.data,
          testimonials: testi.data.data,
          gallery: gallery.data.data,
          posts: posts.data.data,
          gallerySection: gallerySection.data.data,
        });
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [data]);

  const slide = data.slides?.[0];
  // Up to 5 small profile photos for the "Happy Clients" card (falls back to the single icon image).
  const clientAvatars = (slide?.clientAvatars || []).filter((a) => a?.url).slice(0, 5);

  return (
    <Layout>
      <PageMeta pageKey="home" fallbackTitle="Natural Cosmetic Surgery Centre" />

      {/* hero */}
      <section
        id="home"
        className="dr-hero p-relative fix"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(24, 6, 32, 0.94) 0%, rgba(38, 8, 51, 0.86) 30%, rgba(50, 10, 66, 0.35) 58%, rgba(50, 10, 66, 0) 78%), url(/assets/img/slider/hero-bg-lady.png)`,
        }}
      >
        <div className="dr-hero-glow" aria-hidden="true"></div>
        <div className="dr-hero-dots" aria-hidden="true"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12">
              <div className="fade-slide bottom">
                <h1 className="dr-hero-title">{slide?.headline || 'Transforming Looks, Restoring Confidence'}</h1>
                <p className="dr-hero-subtitle">
                  {slide?.subheading ||
                    'Expert breast surgery and cosmetic care, tailored to your body and delivered with precision, discretion, and compassion.'}
                </p>

                <div className="dr-hero-actions">
                  <Link to={slide?.ctaLink || '/contact'} className="dr-hero-btn">
                    {slide?.ctaText || 'Get Appointment'} <i className="fa-light fa-arrow-right-long"></i>
                  </Link>

                  <div className="dr-hero-float-card">
                    {clientAvatars.length > 0 ? (
                      <div className="dr-hero-avatars">
                        {clientAvatars.map((a, i) => (
                          <img key={a.publicId || a.url || i} src={a.url} alt="Happy client" />
                        ))}
                      </div>
                    ) : (
                      <img src={slide?.clientAvatarsImage?.url || '/assets/img/slider/h-client-img.png'} alt="Happy clients" />
                    )}
                    <div>
                      <strong>{slide?.happyClientsCount || '2,000+'}</strong>
                      <span>{slide?.happyClientsLabel || 'Happy Clients'}</span>
                    </div>
                  </div>
                </div>

                <div className="dr-hero-stats">
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter1Value || '15+'}</h3>
                    <p>{slide?.counter1Label || 'Years Experience'}</p>
                  </div>
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter2Value || '5,000+'}</h3>
                    <p>{slide?.counter2Label || 'Procedures Done'}</p>
                  </div>
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter3Value || '98%'}</h3>
                    <p>{slide?.counter3Label || 'Patient Satisfaction'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* about (home-only, independent from /about page content) */}
      <section id="about" className="about-area about-p pt-150 pb-150 p-relative fix">
        <div className="animations-02">
          <img src="/assets/img/features/ab-ani.png" alt="an-img-01" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="s-about-box fix p-relative wow fadeInLeft animated" data-animation="fadeInLeft" data-delay=".4s">
                <div className="img">
                  <img src={data.homeAbout?.primaryImage?.url || '/assets/img/features/about-img-01.png'} alt="img" />
                </div>
                <div className="animations-01">
                  <img src="/assets/img/features/lef-ani-abou.png" alt="an-img-01" />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="about-content s-about-content pl-20 wow fadeInRight animated" data-animation="fadeInRight" data-delay=".4s">
                <div className="row">
                  <div className="col-lg-11">
                    <div className="about-title second-title pb-25">
                      <h5>
                        <span className="line">
                          <img src="/assets/img/bg/h-icon.svg" alt="img" />
                        </span>{' '}
                        {data.homeAbout?.subheading || 'About Us'}
                      </h5>
                      <h2 className="text-anime-style-3">{data.homeAbout?.heading || 'Transform Your Look With Precision'}</h2>
                    </div>
                    <p className="pline">
                      {data.homeAbout?.description ||
                        'Every consultation starts with listening — to your goals, your concerns, and what results would actually mean for you. From there, each procedure is planned around your own anatomy and delivered with the same precision and care we\u2019d want for our own family.'}
                    </p>
                  </div>
                </div>

                <div className="about-content2 mt-20">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="img">
                        <img
                          src={data.homeAbout?.secondaryImage?.url || '/assets/img/features/about-img-02.png'}
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="about-btn about-btn-row pl-20">
                        {(data.homeAbout?.pillButtons?.length
                          ? data.homeAbout.pillButtons
                          : [
                              { text: 'Know Your Doctor', link: '/about', icon: 'fa-light fa-user-doctor' },
                              { text: 'Know The Centre', link: '/know-the-centre', icon: 'fa-light fa-building' },
                              { text: 'Know The Services', link: '/services', icon: 'fa-light fa-briefcase-medical' },
                            ]
                        ).map((btn, i) =>
                          btn.link ? (
                            <div key={i}>
                              <Link to={btn.link}>
                                {btn.icon && <i className={btn.icon}></i>} {btn.text}
                              </Link>
                            </div>
                          ) : (
                            <div key={i}>
                              <span className="about-btn-soon" title="Coming soon">
                                {btn.icon && <i className={btn.icon}></i>} {btn.text}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services — one tile per category, so the home page introduces the three areas of
          care rather than three arbitrary procedures. Each tile links into the Services
          page pre-filtered to that category. */}
      <section className="services-area p-relative fix svc-cat-scope">
        <div
          className="container-box pt-60 pb-150"
          style={{ backgroundColor: '#F2DDF3' }}
        >
          <div className="container">
            <div className="row justify-content-center mb-20">
              <div className="col-lg-7 col-md-12">
                <div className="section-title text-center wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    Our Services
                  </h5>
                  <h2 className="text-anime-style-3">Excellence Across Every Area Of Care</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {SERVICE_CATEGORIES.map((cat, i) => {
                const rep = data.services?.find((s) => (s.category || 'Cosmetic Surgery') === cat.value);
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12" key={cat.value}>
                    <Link
                      to={`/services?category=${encodeURIComponent(cat.value)}`}
                      className="services-box svc-cat-tile wow fadeInUp animated"
                      data-animation="fadeInUp"
                      data-delay={`.${2 + i}s`}
                    >
                      <div className="services-icon">
                        <img src={rep?.image?.url || cat.image} alt={cat.label} />
                      </div>
                      <div className="services-content">
                        <div className="row">
                          <div className="col-lg-12">
                            <h4><i className={cat.icon} style={{ marginRight: 10, color: '#70028F' }}></i>{cat.label}</h4>
                            <p>{cat.blurb}</p>
                            <div className="sbtn">
                              <div className="chevron-button">
                                Explore {cat.shortLabel} <i className="fa-regular fa-arrow-right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="animations-01">
                          <img src="/assets/img/bg/left-ani-02.png" alt="an-img-01" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-40">
              <Link to="/services" className="btn btn2">
                View All Services <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* how to book: offline, online, contact form */}
      <section className="who-area booking-info-area p-relative fix">
        <div className="container-box pt-150 pb-150">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    {data.bookingInfo?.eyebrow || 'Booking Made Easy'}
                  </h5>
                  <h2 className="text-anime-style-3">{data.bookingInfo?.heading || 'How To Book Your Appointment'}</h2>
                  {data.bookingInfo?.description && <p className="mt-15">{data.bookingInfo.description}</p>}
                </div>
              </div>
            </div>
            <div className="row align-items-stretch">
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box booking-step-card wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".2s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <span className="booking-step-num">01</span>
                  <div className="no">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <h3>{data.bookingInfo?.offlineHeading || 'Book Offline'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.offlineDescription ||
                        'Prefer speaking to someone directly? Call our clinic or walk in to schedule your in-person appointment.'}
                    </p>
                    {data.bookingInfo?.offlineAddress && (
                      <p className="booking-address-chip">
                        <i className="fa-solid fa-location-dot"></i> {data.bookingInfo.offlineAddress}
                      </p>
                    )}
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <a href={data.bookingInfo?.offlineButtonLink || 'tel:+919811171293'} className="chevron-button">
                      {data.bookingInfo?.offlineButtonText || 'Call Us'} <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box booking-step-card wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".4s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <span className="booking-step-num">02</span>
                  <div className="no">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <h3>{data.bookingInfo?.onlineHeading || 'Book Online'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.onlineDescription ||
                        'Book from anywhere, anytime. Fill in a few quick details and our team will confirm your slot.'}
                    </p>
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <Link to={data.bookingInfo?.onlineButtonLink || '/contact'} className="chevron-button">
                      {data.bookingInfo?.onlineButtonText || 'Book Appointment'} <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box booking-step-card wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".6s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <span className="booking-step-num">03</span>
                  <div className="no">
                    <i className="fa-solid fa-comment-medical"></i>
                  </div>
                  <h3>{data.bookingInfo?.contactFormHeading || 'Have Questions First?'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.contactFormDescription ||
                        'Send us your questions through our contact form and our team will get back to you shortly.'}
                    </p>
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <Link to={data.bookingInfo?.contactFormButtonLink || '/contact'} className="chevron-button">
                      {data.bookingInfo?.contactFormButtonText || 'Contact Us'} <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it work */}
      <section className="how-it-work-area p-relative fix">
        <div className="container-box pt-150">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="section-title text-center wow fadeInDown animated mb-80" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    how it works{' '}
                    <span className="line-2">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>
                  </h5>
                  <h2 className="text-anime-style-3">Achieve Perfect Shape With Surgery</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {(data.howItWork?.length
                ? data.howItWork
                : [
                    { stepNumber: '01', title: 'Consultation & Assessment' },
                    { stepNumber: '02', title: 'Personalized Treatment Planning' },
                    { stepNumber: '03', title: 'Safe Surgery Procedure' },
                    { stepNumber: '04', title: 'Recovery & Follow-Up' },
                  ]
              ).map((step, i) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={step._id || i}>
                  <div className="how-it-work-box wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                    <div className="no">{step.stepNumber || String(i + 1).padStart(2, '0')}</div>
                    <h3>{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* booking */}
      <section className="p-relative fix pt-150 pb-150">
        <div className="container">
          <div className="dr-booking">
            <div className="dr-booking-row">
              <div className="dr-booking-content">
                <span className="dr-booking-eyebrow">
                  <i className="fa-solid fa-calendar-check"></i> Book A Visit
                </span>
                <h2 className="dr-booking-title text-anime-style-3">{data.bookingSection?.heading || 'Get an Appoinment'}</h2>
                {data.bookingSection?.description && <p className="dr-booking-subtitle">{data.bookingSection.description}</p>}
                <BookingForm />
              </div>
              <div className="dr-booking-visual">
                <div className="dr-booking-blob" aria-hidden="true"></div>
                <div className="dr-booking-photo-wrap">
                  <img src={data.bookingSection?.image?.url || '/assets/img/bg/booking-img.png'} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testimonial-area pt-150 pb-120 p-relative fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  Testimonials
                </h5>
                <h2 className="text-anime-style-3">What Our Client's Say</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {(data.testimonials?.length ? data.testimonials : []).map((t) => (
              <div className="col-lg-4 col-md-6" key={t._id}>
                <div className="testimonial-box mb-30">
                  <div className="qt-icon">
                    <img src="/assets/img/testimonial/qt-icon.png" alt="quote" />
                  </div>
                  <p>{t.quote}</p>
                  <div className="testi-author d-flex align-items-center mt-20">
                    <img src={t.photo?.url || '/assets/img/testimonial/testi_avatar.png'} alt={t.name} style={{ width: 50, borderRadius: '50%', marginRight: 15 }} />
                    <div>
                      <h5 className="mb-0">{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="gallery-area pb-120 fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="section-title section-title-2 center-align p-relative">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  {data.gallerySection?.eyebrow || 'Before/After'}
                </h5>
                <h2 className="text-anime-style-3">{data.gallerySection?.heading || 'Sculpting Dreams Into Stunning Reality'}</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 p-relative text-right d-none d-lg-block">
              <Link to={data.gallerySection?.buttonLink || '/projects'} className="btn btn2">
                {data.gallerySection?.buttonText || 'View All Before/After'} <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {(data.gallery?.length ? data.gallery : []).map((g) => (
              <div className="col-lg-4 col-md-6" key={g._id}>
                <div className="gallery-box mb-30">
                  <img src={g.image?.url} alt={g.category || 'gallery'} style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services ticker / scrollbox */}
      <div className="section-ticker-area fix pt-150 pb-180">
        <div className="section-ticker">
          <div className="ticker">
            <div className="ticker__run">
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Facelift Surgery</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Breast Augmentation</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Lip Enhancement</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Jawline Contouring</span></div>
            </div>
          </div>
        </div>
        <div className="section-ticker section-ticker-arbic">
          <div className="ticker arabic">
            <div className="ticker__run">
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Facelift Surgery</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Breast Augmentation</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Lip Enhancement</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Jawline Contouring</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* blog teaser */}
      <section id="blog" className="blog-area p-relative fix pb-120 home-blog-scope">
        <div className="container">
          <div className="row align-items-center mb-50">
            <div className="col-lg-6 col-md-12">
              <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  Our Blog
                </h5>
                <h2 className="text-anime-style-3">Latest News &amp; Articles</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-right d-none d-lg-block">
              <Link to="/blog" className="btn btn2">
                View All Articles <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>

          <div className="home-blog-carousel-wrap">
            {data.posts?.length ? (
              <div className="home-blog-active">
                {data.posts.map((p) => (
                  <div key={p._id}>
                    <Link to={`/blog/${p.slug}`} className="home-blog-card">
                      <div className="home-blog-card-img">
                        {p.coverImage?.url ? (
                          <img src={p.coverImage.url} alt={p.title} />
                        ) : (
                          <img src="/assets/img/blog/inner_b1.jpg" alt={p.title} />
                        )}
                        {p.category && <span className="home-blog-card-category">{p.category}</span>}
                      </div>
                      <div className="home-blog-card-body">
                        <h4>
                          <span>{p.title}</span>
                        </h4>
                        <p>{p.excerpt}</p>
                        <span className="home-blog-card-readmore">
                          Read More <i className="fa-regular fa-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="text-center mt-30 d-lg-none">
            <Link to="/blog" className="btn btn2">
              View All Articles <i className="fa-light fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState(null);

  // Booking form now goes straight to WhatsApp instead of being saved in the DB.
  const submit = (e) => {
    e.preventDefault();
    const lines = [
      'Hi Dr. Aakansh Jain, I would like to book an appointment.',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
    ];
    if (form.service) lines.push(`Service: ${form.service}`);
    if (form.message) lines.push(`Comments: ${form.message}`);
    openWhatsApp(lines.join('\n'));
    setStatus('success');
    setForm({ name: '', email: '', service: '', message: '' });
  };

  return (
    <form onSubmit={submit} className="dr-booking-form">
      <div className="dr-booking-form-row">
        <div className="dr-field">
          <input type="text" placeholder="First Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="dr-field">
          <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className="dr-field">
        <input type="text" placeholder="Service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
      </div>
      <div className="dr-field">
        <textarea placeholder="Write comments" rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
      </div>
      <button className="dr-booking-submit" type="submit" disabled={status === 'loading'}>
        <span>{status === 'loading' ? 'Sending...' : 'Submit Now'}</span> <i className="fa-light fa-arrow-right-long"></i>
      </button>
      {status === 'success' && <p className="dr-booking-status success">Thanks! We'll be in touch shortly.</p>}
      {status && status !== 'loading' && status !== 'success' && <p className="dr-booking-status error">{status}</p>}
    </form>
  );
}