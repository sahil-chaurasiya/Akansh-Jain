import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Home() {
  const [data, setData] = useState({
    slides: [], homeAbout: null, services: [], whoWeAre: null,
    howItWork: [], bookingSection: null, testimonials: [],
    gallery: [], posts: [], settings: null, gallerySection: null,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/slides?page=home'),
      api.get('/home-about-section'),
      api.get('/services?limit=3'),
      api.get('/who-we-are'),
      api.get('/how-it-work-steps'),
      api.get('/booking-section'),
      api.get('/testimonials'),
      api.get('/gallery-items?limit=6'),
      api.get('/posts?limit=3'),
      api.get('/gallery-section'),
    ])
      .then(([slides, homeAbout, services, who, how, booking, testi, gallery, posts, gallerySection]) => {
        setData({
          slides: slides.data.data,
          homeAbout: homeAbout.data.data,
          services: services.data.data,
          whoWeAre: who.data.data,
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

  return (
    <Layout>
      <PageMeta pageKey="home" fallbackTitle="Natural Cosmetic Surgery Centre" />

      {/* hero */}
      <section id="home" className="slider-area fix p-relative">
        <div className="slider-active2 pl-100 pr-100">
          <div
            className="single-slider slider-bg d-flex img"
            style={{
              backgroundImage: `url(${slide?.image?.url || '/assets/img/slider/header-bg.png'})`,
              backgroundSize: 'cover',
              backgroundColor: '#3A1607',
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="slider-content s-slider-content">
                    <h5 className="fade-slide bottom">
                      <img src="/assets/img/bg/h-icon.png" alt="img" /> {slide?.eyebrowText || 'Best In Town'}
                    </h5>
                    <h2 className="text-anime-style-3">{slide?.headline || 'Transforming Look Changing Lives'}</h2>
                    <p className="fade-slide top">
                      {slide?.subheading ||
                        'Plastic surgery is a specialized medical field that focuses on enhancing restoring function through surgical and non-surgical techniques.'}
                    </p>
                    <div className="slider-btn mt-30">
                      <div className="fade-slide left">
                        <Link to={slide?.ctaLink || '/contact'} className="btn btn-blue mr-15">
                          {slide?.ctaText || 'Get Appointment'} <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                      </div>
                      <div className="user-review fade-slide right">
                        <div className="icon">
                          <img src={slide?.clientAvatarsImage?.url || '/assets/img/slider/h-client-img.png'} alt="img" />
                        </div>
                        <div className="text">
                          <p>{slide?.happyClientsCount || '2,000+'}</p>
                          <p>{slide?.happyClientsLabel || 'Happy Clients'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="counter-outer fade-slide bottom">
                      <ul>
                        <li>
                          <div className="counter-outer-box">
                            <h3>{slide?.counter1Value || '50k+'}</h3>
                            <p>{slide?.counter1Label || 'Clients Review'}</p>
                          </div>
                        </li>
                        <li>
                          <div className="counter-outer-box">
                            <h3>{slide?.counter2Value || '100+'}</h3>
                            <p>{slide?.counter2Label || 'Expert Surgeon'}</p>
                          </div>
                        </li>
                        <li>
                          <div className="counter-outer-box">
                            <h3>{slide?.counter3Value || '20+'}</h3>
                            <p>{slide?.counter3Label || 'Award Winner'}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="image-layer fade-slide right">
                    <div className="play-box fade-slide top">
                      <a href={slide?.videoUrl || 'https://www.youtube.com/watch?v=gyGsPlt06bo'} className="popup-video" tabIndex="0">
                        <img src="/assets/img/slider/slider-play.png" alt="shape" />
                      </a>
                    </div>
                    <img src={slide?.heroImage?.url || '/assets/img/slider/header-img.png'} alt="img" />
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
                <div className="cartifact-box">
                  <div className="icon">
                    <div>
                      <img src="/assets/img/features/ab-cartficat-icon.png" alt="img" />
                    </div>
                  </div>
                  <div className="text">
                    <h3>{data.homeAbout?.badgeText || 'Best Awarded Company'}</h3>
                  </div>
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
                          <img src="/assets/img/bg/h-icon.png" alt="img" />
                        </span>{' '}
                        {data.homeAbout?.subheading || 'About Us'}
                      </h5>
                      <h2 className="text-anime-style-3">{data.homeAbout?.heading || 'Transform Your Look With Precision'}</h2>
                    </div>
                    <p className="pline">
                      {data.homeAbout?.description ||
                        'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, or reshaping the body for both medical and aesthetic purposes. It helps people improve their appearance.'}
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
                      <div className="about-btn pl-20">
                        <div>
                          <Link to={data.homeAbout?.primaryButton?.link || '/services'}>
                            <img src="/assets/img/features/ab-icon-01.png" alt="img" />{' '}
                            {data.homeAbout?.primaryButton?.text || 'Transfer Surgery'}
                          </Link>
                        </div>
                        <div>
                          <Link to={data.homeAbout?.secondaryButton?.link || '/contact'}>
                            <img src="/assets/img/features/ab-icon-02.png" alt="img" />{' '}
                            {data.homeAbout?.secondaryButton?.text || 'Support 24/7'}
                          </Link>
                        </div>
                      </div>

                      <ul className="pl-20">
                        {(data.homeAbout?.featurePoints?.length
                          ? data.homeAbout.featurePoints
                          : [{ text: 'Shaping Confidence Through Expert Surgery' }, { text: 'Discover Beauty Beyond Your Imagination' }]
                        ).map((p, i) => (
                          <li key={i}>
                            <i className="fa-regular fa-arrow-right"></i> {p.text}
                          </li>
                        ))}
                      </ul>

                      <div className="about-outer-btn pl-20">
                        <div>
                          <Link to={data.homeAbout?.ctaLink || '/about'} className="btn mr-15">
                            {data.homeAbout?.ctaText || 'Read More'} <i className="fa-light fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        <div className="review">
                          <div className="icon">
                            <img src="/assets/img/features/ab-icon-03.png" alt="shape" />
                          </div>
                          <div className="text">
                            <div className="star">
                              {data.homeAbout?.ratingValue || '4.9'}/ <img src="/assets/img/features/start-s.png" alt="shape" />
                            </div>
                            <p>{data.homeAbout?.ratingText || '100+ 5star'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="services-area p-relative fix">
        <div
          className="container-box pt-150 pb-150"
          style={{ backgroundColor: '#FDF8F5', backgroundImage: 'url(/assets/img/bg/services-bg.png)', backgroundSize: 'cover' }}
        >
          <div className="container">
            <div className="row align-items-center mb-50">
              <div className="col-lg-6 col-md-12">
                <div className="section-title center-align wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.png" alt="img" />
                    </span>{' '}
                    Our Services
                  </h5>
                  <h2 className="text-anime-style-3">Excellence In Cosmetic Surgical Care</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 text-right d-none d-lg-block">
                <Link to="/services" className="btn btn2">
                  View All service <i className="fa-light fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>
            <div className="row">
              {(data.services?.length ? data.services : Array(3).fill(null)).map((s, i) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={s?._id || i}>
                  <div className="services-box wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                    <div className="services-icon">
                      <img src={s?.image?.url || `/assets/img/bg/services-0${(i % 3) + 1}.png`} alt="icon" />
                    </div>
                    <div className="services-content">
                      <div className="icon">
                        <img src={s?.icon || '/assets/img/icon/sr-icon-01.png'} alt="icon" />
                      </div>
                      <div className="row">
                        <div className="col-lg-10">
                          <h4>
                            <Link to={s ? `/services/${s.slug}` : '/services'}>{s?.title || 'Facelift Rejuvenation Surgery'}</Link>
                          </h4>
                          <div className="sbtn">
                            <Link to={s ? `/services/${s.slug}` : '/services'} className="chevron-button">
                              Read More <i className="fa-regular fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="animations-01">
                        <img src="/assets/img/bg/left-ani-02.png" alt="an-img-01" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* who we are */}
      <section className="who-area p-relative fix">
        <div className="container-box pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12 d-none d-lg-block">
                <div className="who-video wow fadeInLeft animated" data-animation="fadeInLeft" data-delay=".4s">
                  <img src={data.whoWeAre?.image?.url || '/assets/img/bg/who-are-img-01.png'} alt="icon01" />
                  <div className="play-box fade-slide top">
                    <a href="https://www.youtube.com/watch?v=gyGsPlt06bo" className="popup-video" tabIndex="0">
                      <img src="/assets/img/bg/play-2.png" alt="shape" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-8">
                <div className="who-content">
                  <div className="section-title center-align wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                    <h5>
                      <span className="line">
                        <img src="/assets/img/bg/h-icon.png" alt="img" />
                      </span>{' '}
                      Who we are
                    </h5>
                    <h2 className="text-anime-style-3">{data.whoWeAre?.heading || 'Safe Procedures, Beautiful Lasting Results'}</h2>
                  </div>
                  <p>{data.whoWeAre?.description || 'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, or reshaping the body'}</p>
                  <ul>
                    {(data.whoWeAre?.features?.length
                      ? data.whoWeAre.features
                      : [
                          { title: 'Transforming Faces With Precision' },
                          { title: 'Discover Confidence Through Surgery' },
                          { title: 'Redefine Beauty With Confidence' },
                          { title: 'Youthful Appearance Made Possible' },
                        ]
                    ).map((f, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-circle-check"></i> {f.title}
                      </li>
                    ))}
                  </ul>
                  <div className="who-btn">
                    <Link to="/about" className="btn btn2">
                      Read More <i className="fa-light fa-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="who-img wow fadeInRight animated" data-animation="fadeInRight" data-delay=".4s">
                  <img src={data.whoWeAre?.imageSecondary?.url || '/assets/img/bg/who-are-img-02.png'} alt="icon01" />
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
                      <img src="/assets/img/bg/h-icon.png" alt="img" />
                    </span>{' '}
                    how it works{' '}
                    <span className="line-2">
                      <img src="/assets/img/bg/h-icon.png" alt="img" />
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
      <section className="booking p-relative fix">
        <div className="container-box" style={{ backgroundImage: 'url(/assets/img/bg/booking-lef.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="contact-bg02">
                  <div className="section-title center-align">
                    <h2 className="text-anime-style-3">{data.bookingSection?.heading || 'Get an Appoinment'}</h2>
                  </div>
                  <BookingForm />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="booking-img">
                  <img src={data.bookingSection?.image?.url || '/assets/img/bg/booking-img.png'} alt="img" />
                  <div className="play-box fade-slide top">
                    <a href="https://www.youtube.com/watch?v=gyGsPlt06bo" className="popup-video" tabIndex="0">
                      <img src="/assets/img/bg/play-3.png" alt="shape" />
                    </a>
                  </div>
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
                    <img src="/assets/img/bg/h-icon.png" alt="img" />
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
                    <img src="/assets/img/bg/h-icon.png" alt="img" />
                  </span>{' '}
                  {data.gallerySection?.eyebrow || 'Gallery'}
                </h5>
                <h2 className="text-anime-style-3">{data.gallerySection?.heading || 'Sculpting Dreams Into Stunning Reality'}</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 p-relative text-right d-none d-lg-block">
              <Link to={data.gallerySection?.buttonLink || '/projects'} className="btn btn2">
                {data.gallerySection?.buttonText || 'View All Gallery'} <i className="fa-light fa-arrow-right-long"></i>
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
      <section id="blog" className="blog-area p-relative fix pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.png" alt="img" />
                  </span>{' '}
                  Our Blog
                </h5>
                <h2 className="text-anime-style-3">Latest News &amp; Articles</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {(data.posts?.length ? data.posts : []).map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <div className="blog-box mb-30">
                  {p.coverImage?.url && <img src={p.coverImage.url} alt={p.title} style={{ width: '100%' }} />}
                  <h4 className="mt-15">
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h4>
                  <p>{p.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/submissions/booking', form);
      setStatus('success');
      setForm({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={submit} className="contact-form mt-30">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="contact-field p-relative c-name mb-20">
            <input type="text" placeholder="First Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="contact-field p-relative c-subject mb-20">
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="contact-field p-relative c-subject mb-20">
            <input type="text" placeholder="Service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="contact-field p-relative c-message mb-30">
            <textarea placeholder="Write comments" rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
          </div>
          <div className="slider-btn">
            <button className="btn" type="submit" disabled={status === 'loading'}>
              <span>{status === 'loading' ? 'Sending...' : 'Submit Now'}</span> <i className="fa-light fa-arrow-right-long"></i>
            </button>
          </div>
          {status === 'success' && <p className="mt-15" style={{ color: 'green' }}>Thanks! We'll be in touch shortly.</p>}
          {status && status !== 'loading' && status !== 'success' && <p className="mt-15" style={{ color: 'red' }}>{status}</p>}
        </div>
      </div>
    </form>
  );
}