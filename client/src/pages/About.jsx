import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function About() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/about-section'), api.get('/team-members?limit=4'), api.get('/testimonials?limit=3')])
      .then(([a, t, testi]) => {
        setAbout(a.data.data);
        setTeam(t.data.data);
        setTestimonials(testi.data.data);
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [about, team]);

  return (
    <Layout>
      <PageMeta pageKey="about" fallbackTitle="About Us - Lustre" />
      <Breadcrumb title="About" />

      <section id="about" className="about-area about-p pt-150 pb-150 p-relative fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="s-about-box fix p-relative wow fadeInLeft animated" data-animation="fadeInLeft" data-delay=".4s">
                <div className="img">
                  <img src={about?.images?.[0]?.url || '/assets/img/features/about-img-01.png'} alt="img" />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="about-content s-about-content pl-20 wow fadeInRight animated" data-animation="fadeInRight" data-delay=".4s">
                <div className="about-title second-title pb-25">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.png" alt="img" />
                    </span>{' '}
                    About Us
                  </h5>
                  <h2 className="text-anime-style-3">{about?.heading || 'Transform Your Look With Precision'}</h2>
                </div>
                <p className="pline">{about?.description || 'Plastic surgery is a specialized branch of medicine focused on restoring, enhancing, and reshaping the body.'}</p>
                <div className="row mt-30">
                  {(about?.stats?.length ? about.stats : [
                    { label: 'Years Experience', value: '15+' },
                    { label: 'Happy Clients', value: '2,000+' },
                    { label: 'Procedures', value: '30+' },
                  ]).map((s, i) => (
                    <div className="col-4" key={i}>
                      <h3>{s.value}</h3>
                      <p>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-area fix pt-150 pb-60 p-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.png" alt="img" />
                  </span>{' '}
                  Our Team
                </h5>
                <h2 className="text-anime-style-3">Meet Our Specialists</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {team.map((m) => (
              <div className="col-lg-3 col-md-6" key={m._id}>
                <div className="team-box mb-30">
                  <img src={m.photo?.url || '/assets/img/team/team-img1.jpg'} alt={m.name} style={{ width: '100%' }} />
                  <h4 className="mt-15">
                    <Link to={`/team/${m.slug}`}>{m.name}</Link>
                  </h4>
                  <span>{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-area pt-150 pb-120 p-relative fix">
        <div className="container">
          <div className="row">
            {testimonials.map((t) => (
              <div className="col-lg-4 col-md-6" key={t._id}>
                <div className="testimonial-box mb-30">
                  <p>{t.quote}</p>
                  <h5 className="mt-15 mb-0">{t.name}</h5>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
