import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/team-members'), api.get('/faq-items?page=team')])
      .then(([t, f]) => {
        setTeam(t.data.data);
        setFaqs(f.data.data);
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [team]);

  return (
    <Layout>
      <PageMeta pageKey="team" fallbackTitle="Team - Lustre" />
      <Breadcrumb title="Team" />

      <section className="team-area fix pt-150 pb-60 p-relative">
        <div className="container">
          <div className="row">
            {team.map((m) => (
              <div className="col-lg-3 col-md-6" key={m._id}>
                <div className="team-box mb-30">
                  <img src={m.photo?.url || '/assets/img/team/team-img1.jpg'} alt={m.name} style={{ width: '100%' }} />
                  <h4 className="mt-15">
                    <Link to={`/team/${m.slug}`}>{m.name}</Link>
                  </h4>
                  <span>{m.role}</span>
                  {m.socialLinks?.length > 0 && (
                    <ul className="social-icon mt-10">
                      {m.socialLinks.map((s, i) => (
                        <li key={i}>
                          <a href={s.url} target="_blank" rel="noreferrer">
                            {s.platform}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="faq-area faq-area-2 pb-150 p-relative fix">
          <div className="container">
            <div className="accordion" id="teamFaqAccordion">
              {faqs.map((f, i) => (
                <div className="accordion-item" key={f._id}>
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#tfaq${i}`}>
                      {f.question}
                    </button>
                  </h2>
                  <div id={`tfaq${i}`} className="accordion-collapse collapse" data-bs-parent="#teamFaqAccordion">
                    <div className="accordion-body">{f.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
