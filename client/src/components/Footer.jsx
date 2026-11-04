import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import { formatPhone, phoneHref } from '../lib/phone.js';
import './Footer.css';

// Same WhatsApp number used by the floating WhatsApp button and the Contact page.
const WHATSAPP_LINK =
  'https://api.whatsapp.com/send/?phone=919811171293&text&type=phone_number&app_absent=0';

// Fallback for the "Quick Links" column — only used if the admin hasn't set
// footerColumns in Site Settings. The "Our Services" column next to it is never
// hardcoded: it's always built from whatever services actually exist in the admin panel.
const DEFAULT_QUICK_LINKS_COLUMN = {
  heading: 'Quick Links',
  links: [
    { label: 'About Us', url: '/about' },
    { label: 'Before/After', url: '/projects' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact Us', url: '/contact' },
  ],
};

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
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/site-settings').then((res) => setSettings(res.data.data)).catch(() => {});
    api.get('/services').then((res) => setServices(res.data.data)).catch(() => {});
  }, []);

  const logoUrl = '/assets/img/logo/f_logo.png';

  // "Our Services" column is always generated live from the actual Services collection —
  // whatever the admin adds/removes there is exactly what shows up here, nothing hardcoded.
  const servicesColumn = {
    heading: 'Our Services',
    links: services.length
      ? services.slice(0, 8).map((s) => ({ label: s.title, url: `/services/${s.slug}` }))
      : [{ label: 'Add services from the admin panel', url: '/services' }],
  };
  const quickLinksColumn = settings?.footerColumns?.length ? settings.footerColumns[0] : DEFAULT_QUICK_LINKS_COLUMN;
  const columns = [servicesColumn, quickLinksColumn];
  const socialLinks = settings?.socialLinks?.length ? settings.socialLinks : DEFAULT_SOCIAL_LINKS;
  const legalLinks = settings?.footerLegalLinks?.length ? settings.footerLegalLinks : DEFAULT_LEGAL_LINKS;
  const instagramUrl = socialLinks.find((s) => s.icon?.includes('instagram'))?.url || '#';
  const contactEmail = settings?.topContactEmail || 'drakanshjain@gmail.com';
  const phone = settings?.topContactPhone || '9811171293';
  const address = settings?.topContactAddress || 'Dr. Aakansh Jain, Naja Hospital, Shivaji Nagar, Kanpur Road, Jhansi, Uttar Pradesh 284128';

  return (
    <footer className="footer-bg footer-p fix">
      <div
        className="footer-top pt-60"
        style={{ backgroundColor: '#250636' }}
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
          <div className="row footer-widgets-row">
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30 footer-connect">
                <div className="subricbe p-relative">
                  <h3>Connect With Us</h3>
                  <div className="footer-connect-links">
                    <a href={instagramUrl} target="_blank" rel="noreferrer" className="footer-connect-link">
                      <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="footer-connect-link">
                      <i className="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {columns.map((col, i) => (
              <div className={i === 0 ? 'col-xl-3 col-lg-3 col-sm-6' : 'col-xl-2 col-lg-2 col-sm-6'} key={i}>
                <div className="footer-widget mb-30">
                  {col.heading ? <h4 className="fw-title">{col.heading}</h4> : null}
                  <div className="footer-link">
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
                        <a href={phoneHref(phone)}>{formatPhone(phone)}</a>
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
      </div>
      {/* Sits in the plain white area below the dark rounded box, not inside it. */}
      <div className="footer-copyright-wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <p className="footer-copyright-text">
                © {new Date().getFullYear()} Dr. Aakansh Jain. All Rights Reserved. &nbsp;|&nbsp; Designed &amp; Developed by{' '}
                <a href="https://toflymediaa.com" target="_blank" rel="noreferrer">
                  Tofly Media
                </a>
              </p>
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
    </footer>
  );
}