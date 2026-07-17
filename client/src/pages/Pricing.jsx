import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get('/pricing-plans')
      .then((res) => setPlans(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [plans]);

  return (
    <Layout>
      <PageMeta pageKey="pricing" fallbackTitle="Pricing - Lustre" />
      <Breadcrumb title="Pricing" />

      <section id="pricing" className="pricing-area pt-120 pb-60 fix p-relative">
        <div className="container">
          <div className="row">
            {plans.map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <div className={`pricing-box mb-30 ${p.isPopular ? 'active' : ''}`}>
                  {p.isPopular && <span className="badge">Most Popular</span>}
                  <h3>{p.name}</h3>
                  <h2>
                    ${p.price}
                    <span>/{p.billingPeriod}</span>
                  </h2>
                  <ul>
                    {p.features?.map((f, i) => (
                      <li key={i} style={{ opacity: f.included ? 1 : 0.5 }}>
                        <i className={f.included ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'}></i> {f.text}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.ctaLink || '/contact'} className="btn">
                    {p.ctaText || 'Choose Plan'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
