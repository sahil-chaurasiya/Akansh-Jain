import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/site-settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const logoUrl = settings?.logoAlt?.url || settings?.logo?.url || '/assets/img/logo/f_logo.png';
  const columns = settings?.footerColumns?.length
    ? settings.footerColumns
    : [
        { heading: 'Quick Links', links: [{ label: 'About Us', url: '/about' }, { label: 'Services', url: '/services' }, { label: 'Contact', url: '/contact' }] },
      ];
  const email = settings?.topContactEmail || 'nathan.roberts@example.com';
  const phone = settings?.topContactPhone || '(603) 555-0123';
  const address = settings?.topContactAddress || '6391 Elgin St. Celina, Delaware';
  const copyright = settings?.copyrightText || 'Copyright & Design By @Zcubethemes - 2025. All Rights Reserved';

  return (
    <footer className="footer-bg footer-p fix">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="footer-widget mb-30">
              <div className="f-logo mb-25">
                <Link to="/">
                  <img src={logoUrl} alt="logo" />
                </Link>
              </div>
              {settings?.socialLinks?.length ? (
                <ul className="social-icon">
                  {settings.socialLinks.map((s, i) => (
                    <li key={i}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        <i className={s.icon || 'fa-brands fa-facebook-f'}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          {columns.map((col, i) => (
            <div className="col-xl-2 col-lg-2 col-sm-6" key={i}>
              <div className="footer-widget mb-30">
                <h4 className="fw-title">{col.heading}</h4>
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
                      {email}
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
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">Terms of use</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
