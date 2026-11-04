import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import { formatPhone } from '../lib/phone.js';

const FALLBACK_NAV = [
  { _id: 'home', label: 'Home', link: '/' },
  { _id: 'about', label: 'About Us', link: '/about' },
  { _id: 'services', label: 'Services', link: '/services' },
  { _id: 'projects', label: 'Before/After', link: '/projects' },
  { _id: 'blog', label: 'Blog', link: '/blog' },
  { _id: 'online-consultation', label: 'Consultation', link: '/online-consultation', openInNewTab: true },
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
        const items = res.data.data;
        if (!items?.length) return;
        // Guarantee the Online Consultation link always shows even on sites whose
        // nav-items collection was seeded before this link existed. If an admin adds
        // their own "/online-consultation" entry (or edits this one) via the admin
        // panel, that DB record is used instead — this is only a fallback.
        const hasConsultationLink = items.some((n) => n.link === '/online-consultation');
        setNavItems(hasConsultationLink ? items : [...items, FALLBACK_NAV.find((n) => n._id === 'online-consultation')]);
      })
      .catch(() => {});
  }, []);

  const logoUrl = '/assets/img/logo/logo.png';
  const phone = settings?.topContactPhone || '9811171293';
  const ctaText = settings?.headerCtaText || 'Get Appointment';
  const ctaLink = settings?.headerCtaLink || '/contact';

  return (
    <header className="header-area header-two pt-30 pb-30">
      {/* Scoped fix: the stock template's nav spacing (40px between items, base font-size)
          was tuned for 7 menu items. With an 8th item ("Consultation") added, it would
          overflow the row and wrap onto an ugly second line on many desktop widths. This
          tightens spacing/font-size just enough for 8 items to fit on one line, and — as a
          safety net for any narrower window where it still wraps — makes the wrap land as a
          clean, right-aligned second row instead of the default inline-block wrap. */}
      <style>{`
        /* The stock template's stylesheet (style.css / responsive.css) drags .main-menu
           left with a negative margin at every desktop width (-100px / -80px / -50px
           depending on breakpoint) — a leftover from the original layout it was built
           for. Combined with our right-aligned nav, that just pulls the whole menu away
           from the phone/CTA block on the right, leaving a large dead gap between them.
           .main-menu is only used here, so it's safe to zero it out unconditionally —
           this selector's specificity beats the template's plain ".main-menu" rule at
           every breakpoint, including inside its own @media blocks. */
        .header-two .second-menu .main-menu {
          margin-left: 0 !important;
        }
        .header-two .second-menu .main-menu ul {
          display: flex !important;
          flex-wrap: wrap;
          justify-content: flex-end !important;
          row-gap: 6px;
        }
        .header-two .second-menu .main-menu ul li {
          margin-left: 22px;
        }
        .header-two .second-menu .main-menu ul li:first-child {
          margin-left: 0;
        }
        .header-two .second-menu .main-menu ul li a {
          font-size: 15px;
        }
        /* Bigger logo WITHOUT changing the navbar height: transform: scale() is purely
           visual and doesn't affect layout, so the <img> still occupies its original
           box and the header keeps exactly the same size. Origin is left-centre so it
           grows to the right/up/down and stays aligned with the page's left edge. */
        @media (min-width: 1200px) {
          .header-two .logo img {
            transform: scale(1.6);
            transform-origin: left center;
          }
        }
        /* Keep a clear gap between the enlarged logo and the first menu item by nudging
           the menu to the right. There's plenty of empty space between the menu and the
           CTA block, so this doesn't crowd anything and doesn't change the header height.
           The logo's width differs by breakpoint, hence the different offsets. */
        @media (min-width: 1200px) {
          .header-two .second-menu .main-menu { margin-left: 110px !important; }
        }
        @media (min-width: 1280px) {
          .header-two .second-menu .main-menu { margin-left: 25px !important; }
        }
        @media (min-width: 1500px) {
          .header-two .second-menu .main-menu { margin-left: 70px !important; }
        }
        @media (min-width: 1200px) and (max-width: 1500px) {
          .header-two .second-menu .main-menu ul li {
            margin-left: 14px;
          }
          .header-two .second-menu .main-menu ul li a {
            font-size: 14px;
          }
        }
      `}</style>
      <div className="menu-area">
        <div className="container-fluid pl-100 pr-100">
          <div className="second-menu">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-5">
                <div className="logo">
                  <Link to="/">
                    <img src={logoUrl} alt="Dr. Aakansh Jain" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7">
                {/* marginLeft/display/justifyContent set inline (not just via the <style>
                    block below) because the stock stylesheet's ".main-menu { margin-left:
                    -100px }" and its default inline-block <ul> were still winning over the
                    scoped CSS rules in some builds — inline styles can't be beaten by any
                    external stylesheet, so this guarantees the nav sits flush against the
                    phone/CTA block on the right instead of stranding it behind a dead gap. */}
                <div className="main-menu text-right" style={{ marginLeft: 0 }}>
                  <nav id="mobile-menu">
                    <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', rowGap: '6px', margin: 0, padding: 0 }}>
                      {navItems
                        .filter((n) => !n.parentId)
                        .map((item) =>
                          item.openInNewTab ? (
                            <li key={item._id}>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.label}
                              </a>
                            </li>
                          ) : (
                            <li key={item._id}>
                              <Link to={item.link}>{item.label}</Link>
                            </li>
                          )
                        )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 d-none d-lg-block text-right">
                <div className="header-cta-2">
                  <ul>
                    <li className="h-phone">
                      <div className="icon">
                        <img src="/assets/img/icon/header-picon.png" alt="phone" />
                      </div>{' '}
                      <span>{formatPhone(phone)}</span>
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