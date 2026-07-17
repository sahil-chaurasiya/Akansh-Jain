import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';

const FALLBACK_NAV = [
  { _id: 'home', label: 'Home', link: '/' },
  { _id: 'about', label: 'About Us', link: '/about' },
  { _id: 'services', label: 'Services', link: '/services' },
  { _id: 'projects', label: 'Gallery', link: '/projects' },
  { _id: 'pricing', label: 'Pricing', link: '/pricing' },
  { _id: 'team', label: 'Team', link: '/team' },
  { _id: 'faq', label: 'Faq', link: '/faq' },
  { _id: 'blog', label: 'Blog', link: '/blog' },
  { _id: 'contact', label: 'Contact Us', link: '/contact' },
];

export default function Header() {
  const [settings, setSettings] = useState(null);
  const [navItems, setNavItems] = useState(FALLBACK_NAV);

  useEffect(() => {
    api.get('/site-settings').then((res) => setSettings(res.data.data)).catch(() => {});
    api
      .get('/nav-items')
      .then((res) => {
        if (res.data.data?.length) setNavItems(res.data.data);
      })
      .catch(() => {});
  }, []);

  const logoUrl = settings?.logo?.url || '/assets/img/logo/logo.png';
  const phone = settings?.topContactPhone || '(406) 555-0120';
  const ctaText = settings?.headerCtaText || 'Get Appointment';
  const ctaLink = settings?.headerCtaLink || '/contact';

  return (
    <header className="header-area header-two pt-30 pb-30">
      <div className="menu-area">
        <div className="container-fluid pl-100 pr-100">
          <div className="second-menu">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-5">
                <div className="logo">
                  <Link to="/">
                    <img src={logoUrl} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7">
                <div className="main-menu text-right">
                  <nav id="mobile-menu">
                    <ul>
                      {navItems
                        .filter((n) => !n.parentId)
                        .map((item) => (
                          <li key={item._id}>
                            <Link to={item.link}>{item.label}</Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-4 col-lg-3 d-none d-lg-block text-right">
                <div className="header-cta-2">
                  <ul>
                    <li className="h-phone">
                      <div className="icon">
                        <img src="/assets/img/icon/header-picon.png" alt="phone" />
                      </div>{' '}
                      <span>{phone}</span>
                    </li>
                    <li>
                      <Link to={ctaLink} className="btn top-btn">
                        {ctaText} <i className="fa-light fa-arrow-right-long"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
