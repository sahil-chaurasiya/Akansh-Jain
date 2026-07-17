import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import LoadingBlock from '../components/LoadingBlock.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    Promise.all([api.get(`/services/slug/${slug}`), api.get('/services')])
      .then(([s, all]) => {
        setService(s.data.data);
        setAllServices(all.data.data);
      })
      .finally(() => setReady(true));
  }, [slug]);

  useLegacyScripts(ready, [service]);

  if (ready && !service) {
    return (
      <Layout>
        <Breadcrumb title="Service Not Found" />
        <div className="container py-5">
          <p>We couldn't find that service.</p>
          <Link to="/services" className="btn">Back to Services</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageMeta pageKey={`service-${slug}`} fallbackTitle={`${service?.title || 'Service'} - Lustre`} />
      <Breadcrumb title={service?.title || 'Service Details'} />
      {!ready ? (
        <LoadingBlock />
      ) : (
        <section className="services-details pt-120 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {service.image?.url && <img src={service.image.url} alt={service.title} style={{ width: '100%', marginBottom: 30 }} />}
                <h2>{service.title}</h2>
                <p>{service.shortDesc}</p>
                <div dangerouslySetInnerHTML={{ __html: service.bodyContent || '' }} />
                {service.gallery?.length > 0 && (
                  <div className="row mt-30">
                    {service.gallery.map((g, i) => (
                      <div className="col-md-4" key={i}>
                        <img src={g.url} alt={`gallery ${i}`} style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <div className="services-sidebar">
                  <h4 className="mb-15">All Services</h4>
                  <ul>
                    {allServices.map((s) => (
                      <li key={s._id} className="mb-10">
                        <Link to={`/services/${s.slug}`} className={s.slug === slug ? 'active' : ''}>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {ready && (
        <section className="faq-area faq-area-2 pb-150 p-relative fix">
          <div className="container">
            <div className="section-title text-center mb-50">
              <h2 className="text-anime-style-3">Get an Appointment</h2>
            </div>
            <div className="text-center">
              <Link to="/contact" className="btn">
                Contact Us <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
