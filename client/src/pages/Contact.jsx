import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './contact-premium.css';

const FALLBACK_ADDRESS = 'Dr. Aakansh Jain, Naja Hospital, Shivaji Nagar, Kanpur Road, Jhansi, Uttar Pradesh 284128';
const FALLBACK_PHONE = '9278479456';
const FALLBACK_EMAIL = 'drakanshjain@gmail.com';

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/contact-info')
      .then((res) => setInfo(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [info]);

  const address = info?.address || FALLBACK_ADDRESS;
  const phone = info?.phone || FALLBACK_PHONE;
  const email = info?.email || FALLBACK_EMAIL;
  const officeHours = info?.officeHours;
  const mapEmbedUrl = info?.mapEmbedUrl;
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/submissions/contact', form);
      navigate('/thank-you');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Layout>
      <PageMeta pageKey="contact" fallbackTitle="Contact Us - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Contact Us" />

      <section className="cp-contact">
        <div className="cp-wrap">
          <div className="cp-head">
            <span className="cp-eyebrow">Get In Touch</span>
            <h2>Let&rsquo;s plan your visit</h2>
            <p>
              Reach out with your questions or book a consultation — our team usually replies
              within one business day.
            </p>
          </div>

          <div className="cp-quick">
            <a className="cp-pill" href={telHref}>
              <i className="fa-solid fa-phone"></i> {phone}
            </a>
            <a className="cp-pill" href={`mailto:${email}`}>
              <i className="fa-solid fa-envelope"></i> {email}
            </a>
            <a
              className="cp-pill"
              href="https://api.whatsapp.com/send/?phone=919811171293&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
            </a>
          </div>

          <div className="cp-slip">
            <div className="cp-slip-info">
              <span className="cp-kicker">Clinic Details</span>
              <h3>Visit or reach us</h3>

              <div className="cp-info-row">
                <div className="cp-info-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="cp-info-text">
                  <h4>Address</h4>
                  <p>{address}</p>
                </div>
              </div>

              <div className="cp-info-row">
                <div className="cp-info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="cp-info-text">
                  <h4>Phone</h4>
                  <a href={telHref}>{phone}</a>
                </div>
              </div>

              <div className="cp-info-row">
                <div className="cp-info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="cp-info-text">
                  <h4>Email</h4>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>

              {officeHours && (
                <div className="cp-info-row">
                  <div className="cp-info-icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="cp-info-text">
                    <h4>Office Hours</h4>
                    <p>{officeHours}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="cp-tear"></div>

            <div className="cp-slip-form">
              <h3>Send a message</h3>
              <p>Fill in the details below and we&rsquo;ll get back to you shortly.</p>

              <form onSubmit={submit}>
                <div className="cp-form-grid">
                  <div className="cp-field">
                    <label htmlFor="cp-name">Your Name</label>
                    <input
                      id="cp-name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-email">Your Email</label>
                    <input
                      id="cp-email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="cp-field cp-field-full">
                    <label htmlFor="cp-subject">Subject</label>
                    <input
                      id="cp-subject"
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div className="cp-field cp-field-full">
                    <label htmlFor="cp-message">Message</label>
                    <textarea
                      id="cp-message"
                      rows="5"
                      placeholder="Tell us a little about what you're looking for"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="cp-submit-row">
                  <button className="cp-submit" type="submit" disabled={status === 'loading'}>
                    <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                    <span className="cp-submit-icon">
                      <i className="fa-light fa-arrow-right-long"></i>
                    </span>
                  </button>
                  {status && status !== 'loading' && <p className="cp-status">{status}</p>}
                </div>
              </form>
            </div>
          </div>

          <div className="cp-map-card">
            {mapEmbedUrl ? (
              <>
                <span className="cp-map-tag">
                  <i className="fa-solid fa-location-dot"></i> Find Us
                </span>
                <iframe src={mapEmbedUrl} loading="lazy" title="map"></iframe>
              </>
            ) : (
              <div className="cp-map-empty">Map coming soon.</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}