import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './about-premium.css';
import './premium-sections.css';
import './profile-credentials.css';
import './about-bio.css';
import './about-media.css';

// Same text as the defaults in server/src/models/AboutSection.js — only used if the API can't be reached.
const FALLBACK_BIO_LABEL = 'About Us';
const FALLBACK_BIO_HEADING = 'Meet Dr. Aakansh Jain';
const FALLBACK_BIO_TAGLINE =
  'Cosmetic and plastic and reconstructive surgeon with special interest in hand and micro surgery';

// Renders **bold** segments without using dangerouslySetInnerHTML.
const renderInline = (text) =>
  String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') && part.length > 4
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );

// Turns a pasted YouTube / Vimeo / direct-video link into something we can embed.
// Returns null for links we can't embed (they're simply skipped).
const getEmbed = (rawUrl) => {
  const url = String(rawUrl || '').trim();
  if (!url) return null;
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return { kind: 'iframe', src: `https://www.youtube.com/embed/${m[1]}?rel=0` };
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return { kind: 'iframe', src: `https://player.vimeo.com/video/${m[1]}` };
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { kind: 'video', src: url };
  return null;
};

// Cloudinary can hand back a still frame of any video by swapping the extension for .jpg.
const reelPoster = (url) =>
  /res\.cloudinary\.com\/.+\/video\/upload\//.test(url || '') ? url.replace(/\.[a-z0-9]+$/i, '.jpg') : undefined;

// One reel tile: plays (muted, looping) while on screen, pauses when scrolled away.
function ReelCard({ reel, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const inner = (
    <>
      <video
        ref={videoRef}
        src={reel.video?.url}
        poster={reelPoster(reel.video?.url)}
        muted
        loop
        playsInline
        preload="metadata"
      />
      {reel.caption && <div className="am-reel-caption">{reel.caption}</div>}
    </>
  );

  return reel.linkUrl ? (
    <a ref={cardRef} href={reel.linkUrl} target="_blank" rel="noopener noreferrer" className="am-reel">
      {inner}
    </a>
  ) : (
    <button ref={cardRef} type="button" className="am-reel" onClick={() => onOpen(reel)} aria-label={reel.caption || 'Play reel'}>
      {inner}
    </button>
  );
}

const DEFAULT_HIGHLIGHTS = [
  { icon: 'fa-solid fa-user-doctor', text: 'Board Certified Surgeon' },
  { icon: 'fa-solid fa-house-medical', text: '10+ Years of Experience' },
  { icon: 'fa-solid fa-heart-pulse', text: 'Personalized Care Plans' },
  { icon: 'fa-solid fa-user-shield', text: 'Privacy & Comfort First' },
];

export default function About() {
  const [about, setAbout] = useState(null);
  const [reels, setReels] = useState([]);
  const [activeReel, setActiveReel] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reels are optional — if that request fails the rest of the page still renders.
    Promise.all([api.get('/about-section'), api.get('/about-reels').catch(() => ({ data: { data: [] } }))])
      .then(([a, r]) => {
        setAbout(a.data.data);
        setReels(r.data.data || []);
      })
      .finally(() => setReady(true));
  }, []);

  // Close the reel popup with Escape.
  useEffect(() => {
    if (!activeReel) return undefined;
    const onKey = (e) => e.key === 'Escape' && setActiveReel(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeReel]);

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
                {(() => {
                  const label = about ? about.bioLabel : FALLBACK_BIO_LABEL;
                  const heading = about ? about.bioHeading : FALLBACK_BIO_HEADING;
                  // Brackets are added here, so strip any the admin typed themselves.
                  const tagline = String((about ? about.bioTagline : FALLBACK_BIO_TAGLINE) || '')
                    .trim()
                    .replace(/^\(+\s*/, '')
                    .replace(/\s*\)+$/, '');
                  const bioParagraphs = String(about?.bioText || '')
                    .split(/\n\s*\n/)
                    .map((p) => p.trim())
                    .filter(Boolean);
                  return (
                    <div className="about-bio">
                      {label && (
                        <h5 className="about-bio-label">
                          <span className="line">
                            <img src="/assets/img/bg/h-icon.svg" alt="img" />
                          </span>{' '}
                          {label}
                        </h5>
                      )}
                      {(heading || tagline) && (
                        <h2 className="about-bio-heading">
                          {heading}
                          {tagline && <span className="about-bio-tagline"> ({tagline})</span>}
                        </h2>
                      )}
                      {bioParagraphs.map((p, i) => (
                        <p className="about-bio-text" key={i}>{renderInline(p)}</p>
                      ))}
                      {about?.bioSignature && <p className="about-bio-signature">{renderInline(about.bioSignature)}</p>}
                    </div>
                  );
                })()}

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

      {(() => {
        const embeds = (about?.featuredVideoUrls || []).map(getEmbed).filter(Boolean);
        if (!embeds.length) return null;
        return (
          <section className="am-section am-video-section">
            <div className="container">
              <div className="am-header">
                <h2>{about?.featuredVideoHeading || 'Watch & Listen'}</h2>
                {about?.featuredVideoSubheading && <p>{about.featuredVideoSubheading}</p>}
              </div>
              <div className={`am-video-grid${embeds.length === 1 ? ' am-video-single' : ''}`}>
                {embeds.map((e, i) => (
                  <div className="am-video-frame" key={i}>
                    {e.kind === 'iframe' ? (
                      <iframe
                        src={e.src}
                        title={`${about?.featuredVideoHeading || 'Video'} ${i + 1}`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video src={e.src} controls preload="metadata" playsInline></video>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {reels.length > 0 && (
        <section className="am-section am-reels-section">
          <div className="container">
            <div className="am-header">
              <h2>{about?.reelsHeading || 'Our Reels'}</h2>
              {(about?.reelsSubheading ?? 'Watch our latest reels') && (
                <p>{about?.reelsSubheading ?? 'Watch our latest reels'}</p>
              )}
            </div>
          </div>
          <div className="am-reels-wrap">
            {/* Enough reels -> endless auto-scroll (list repeated once for a seamless loop).
                Only a few -> a still, centred row so nothing looks duplicated. */}
            <div className={`am-reels-track${reels.length >= 5 ? ' am-reels-marquee' : ''}`}>
              {(reels.length >= 5 ? [...reels, ...reels] : reels).map((r, i) => (
                <ReelCard key={`${r._id}-${i}`} reel={r} onOpen={setActiveReel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {activeReel && (
        <div className="am-modal" role="dialog" aria-modal="true" onClick={() => setActiveReel(null)}>
          <div className="am-modal-body" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="am-modal-close" aria-label="Close" onClick={() => setActiveReel(null)}>
              &times;
            </button>
            <video src={activeReel.video?.url} controls autoPlay playsInline></video>
            {activeReel.caption && <p>{activeReel.caption}</p>}
          </div>
        </div>
      )}
    </Layout>
  );
}