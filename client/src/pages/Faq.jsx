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
      <PageMeta pageKey="faq" fallbackTitle="FAQ - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Faq" />

      <section className="faq-area faq-area-2 pt-120 pb-150 p-relative fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="section-title text-left">
                <h2>FAQ</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="235" height="235" viewBox="0 0 235 235" fill="none">
                  <g clipPath="url(#faqClip)">
                    <path
                      opacity="0.2"
                      d="M228.454 25.0077L228.454 179.529C228.454 182.751 227.129 185.84 224.771 188.118C222.412 190.396 219.213 191.676 215.878 191.676C212.543 191.676 209.344 190.396 206.986 188.118C204.627 185.84 203.302 182.751 203.302 179.529L203.313 54.3131L29.2408 222.451C26.8837 224.728 23.6868 226.007 20.3533 226.007C17.0199 226.007 13.8229 224.728 11.4658 222.451C9.10871 220.175 7.7845 217.087 7.7845 213.867C7.7845 210.647 9.10871 207.559 11.4658 205.282L185.538 37.1441L55.9033 37.1548C52.568 37.1548 49.3693 35.875 47.0108 33.597C44.6524 31.319 43.3275 28.2293 43.3275 25.0077C43.3275 21.7861 44.6524 18.6964 47.0108 16.4184C49.3693 14.1404 52.568 12.8606 55.9033 12.8606L215.878 12.8606C217.53 12.8597 219.166 13.1733 220.692 13.7834C222.218 14.3936 223.605 15.2883 224.773 16.4165C225.941 17.5446 226.867 18.884 227.499 20.3582C228.13 21.8323 228.455 23.4123 228.454 25.0077Z"
                      fill="#D96B3D"
                    />
                  </g>
                  <defs>
                    <clipPath id="faqClip">
                      <rect width="235" height="235" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="faq-wrap pl-30 pt-20 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                <div className="accordion" id="accordionExample">
                  {faqs.map((f, i) => (
                    <div className="card" key={f._id}>
                      <div className="card-header" id={`heading${i}`}>
                        <h2 className="mb-0">
                          <button
                            className={`faq-btn${i === 0 ? '' : ' collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${i}`}
                          >
                            {f.question}
                          </button>
                        </h2>
                      </div>
                      <div id={`collapse${i}`} className={`collapse${i === 0 ? ' show' : ''}`} data-bs-parent="#accordionExample">
                        <div className="card-body">{f.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}