import { useEffect, useState } from 'react';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get('/faq-items?page=faq')
      .then((res) => setFaqs(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [faqs]);

  return (
    <Layout>
      <PageMeta pageKey="faq" fallbackTitle="FAQ - Lustre" />
      <Breadcrumb title="Faq" />

      <section className="faq-area faq-area-2 pt-120 pb-150 p-relative fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((f, i) => (
                  <div className="accordion-item" key={f._id}>
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${i}`}>
                        {f.question}
                      </button>
                    </h2>
                    <div id={`faq${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">{f.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
