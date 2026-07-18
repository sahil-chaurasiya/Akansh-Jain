import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';

// Sensible fallbacks so the footer still looks right before /site-settings
// has loaded, or if a site admin hasn't filled in a particular field yet.
const DEFAULT_COLUMNS = [
  {
    links: [
      { label: 'Face Lift', url: '/' },
      { label: 'Nose Job', url: '/' },
      { label: 'Liposuction', url: '/' },
      { label: 'Brow Lift', url: '/' },
      { label: 'Neck Lift', url: '/' },
      { label: 'Breast Lift', url: '/' },
    ],
  },
  {
    links: [
      { label: 'Ear Surgery', url: '/' },
      { label: 'Botox', url: '/' },
      { label: 'Resurfacing', url: '/' },
      { label: 'Contouring', url: '/' },
      { label: 'Creative', url: '/' },
      { label: 'Makeover', url: '/' },
    ],
  },
];

const DEFAULT_SOCIAL_LINKS = [
  { url: '#', icon: 'fab fa-facebook-f' },
  { url: '#', icon: 'fab fa-instagram' },
  { url: '#', icon: 'fa-brands fa-x-twitter' },
  { url: '#', icon: 'fab fa-behance' },
];

const DEFAULT_LEGAL_LINKS = [
  { label: 'Privacy policy', url: '#' },
  { label: 'Terms of use', url: '#' },
  { label: 'Security', url: '#' },
];

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get('/site-settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const logoUrl = settings?.logoAlt?.url || settings?.logo?.url || '/assets/img/logo/f_logo.png';
  const bgImage = settings?.footerBgImage?.url;
  const columns = settings?.footerColumns?.length ? settings.footerColumns : DEFAULT_COLUMNS;
  const socialLinks = settings?.socialLinks?.length ? settings.socialLinks : DEFAULT_SOCIAL_LINKS;
  const legalLinks = settings?.footerLegalLinks?.length ? settings.footerLegalLinks : DEFAULT_LEGAL_LINKS;
  const newsletterHeading = settings?.newsletterHeading || 'Subscribe our Newsletter';
  const contactEmail = settings?.topContactEmail || 'drakanshjain@gmail.com';
  const phone = settings?.topContactPhone || '9278479456';
  const address = settings?.topContactAddress || 'Dr. Aakansh Jain, Naja Hospital, Shivaji Nagar, Kanpur Road, Jhansi, Uttar Pradesh 284128';
  const copyright = settings?.copyrightText || 'Copyright & Design By @Zcubethemes - 2025. All Rights Reserved';

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/submissions/newsletter', { email });
      setStatus('Subscribed!');
      setEmail('');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <footer className="footer-bg footer-p fix">
      <div
        className="footer-top pt-60"
        style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left' } : undefined}
      >
        <div className="container f-logo-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="f-widget-title">
                <Link to="/">
                  <img src={logoUrl} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
              <div className="footer-social mt-10">
                {socialLinks.map((s, i) => (
                  <a href={s.url || '#'} key={i} target="_blank" rel="noreferrer">
                    <i className={s.icon || 'fa-brands fa-facebook-f'}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="subricbe p-relative">
                  <h3>{newsletterHeading}</h3>
                  <form onSubmit={subscribe} className="contact-form mt-30 p-relative">
                    <input
                      type="email"
                      id="email2"
                      name="email2"
                      className="header-input"
                      placeholder="Your Email..."
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn header-btn" type="submit" disabled={status === 'loading'}>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </form>
                  {status && status !== 'loading' && <p className="mt-15">{status}</p>}
                </div>
              </div>
            </div>
            {columns.map((col, i) => (
              <div className="col-xl-2 col-lg-2 col-sm-6" key={i}>
                <div className="footer-widget mb-30">
                  {col.heading ? <h4 className="fw-title">{col.heading}</h4> : null}
                  <div className="footer-link bdr pl-50">
                    <ul>
                      {col.links?.map((l, j) => (
                        <li key={j}>
                          <a href={l.url}>{l.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-contact pl-50">
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div className="text">
                        <h4>Email</h4>
                        {contactEmail}
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa fa-phone"></i>
                      </div>
                      <div className="text">
                        <h4>Call</h4>
                        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa fa-map-marker-check"></i>
                      </div>
                      <div className="text">
                        <h4>Address</h4>
                        {address}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">{copyright}</div>
              <div className="col-lg-6 col-md-12 text-right">
                <ul>
                  {legalLinks.map((l, i) => (
                    <li key={i}>
                      <a href={l.url || '#'}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}