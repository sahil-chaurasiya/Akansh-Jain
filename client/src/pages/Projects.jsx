import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/gallery-items')])
      .then(([p, g]) => {
        setProjects(p.data.data);
        setGallery(g.data.data);
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [projects]);

  return (
    <Layout>
      <PageMeta pageKey="projects" fallbackTitle="Gallery - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Gallery" />

      <section className="gallery-area pt-150 pb-120 fix">
        <div className="container">
          <div className="row isotope-grid">
            {projects.map((p) => (
              <div className="col-lg-4 col-md-6 isotope-item" data-category={p.category} key={p._id}>
                <div className="gallery-box mb-30">
                  <img src={p.image?.url} alt={p.title} style={{ width: '100%' }} />
                  <h4 className="mt-15">
                    <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                  </h4>
                  <span>{p.category}</span>
                </div>
              </div>
            ))}
          </div>

          {gallery.length > 0 && (
            <div className="row mt-50 before-after-grid">
              {gallery.map((g) => (
                <div className="col-lg-4 col-md-6" key={g._id}>
                  <div className="ba-box mb-30">
                    {g.beforeImage?.url && g.afterImage?.url ? (
                      <div className="d-flex">
                        <img src={g.beforeImage.url} alt="before" style={{ width: '50%' }} />
                        <img src={g.afterImage.url} alt="after" style={{ width: '50%' }} />
                      </div>
                    ) : (
                      <img src={g.image?.url} alt={g.category} style={{ width: '100%' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}