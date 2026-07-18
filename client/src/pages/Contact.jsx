import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

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

      <section id="contact" className="contact-area3 after-none contact-bg pt-120 p-relative fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info-box">
                <h4>Address</h4>
                <p>{info?.address || '6391 Elgin St. Celina, Delaware'}</p>
                <h4 className="mt-20">Phone</h4>
                <p>
                  <a href={`tel:${(info?.phone || '').replace(/[^\d+]/g, '')}`}>{info?.phone || '(603) 555-0123'}</a>
                </p>
                <h4 className="mt-20">Email</h4>
                <p>{info?.email || 'nathan.roberts@example.com'}</p>
                {info?.officeHours && (
                  <>
                    <h4 className="mt-20">Office Hours</h4>
                    <p>{info.officeHours}</p>
                  </>
                )}
                {info?.mapEmbedUrl && (
                  <div className="mt-30">
                    <iframe src={info.mapEmbedUrl} width="100%" height="300" style={{ border: 0 }} loading="lazy" title="map"></iframe>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={submit} className="contact-form">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="contact-field p-relative c-name mb-20">
                      <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-field p-relative c-subject mb-20">
                      <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-subject mb-20">
                      <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-message mb-30">
                      <textarea placeholder="Write your message" rows="6" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                    </div>
                    <button className="btn" type="submit" disabled={status === 'loading'}>
                      <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span> <i className="fa-light fa-arrow-right-long"></i>
                    </button>
                    {status && status !== 'loading' && <p className="mt-15" style={{ color: 'red' }}>{status}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}