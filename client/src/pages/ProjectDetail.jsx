import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import LoadingBlock from '../components/LoadingBlock.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    api
      .get(`/projects/slug/${slug}`)
      .then((res) => setProject(res.data.data))
      .finally(() => setReady(true));
  }, [slug]);

  useLegacyScripts(ready, [project]);

  return (
    <Layout>
      <PageMeta pageKey={`project-${slug}`} fallbackTitle={`${project?.title || 'Project'} - Natural Cosmetic Surgery Centre`} />
      <Breadcrumb title={project?.title || 'Gallery Details'} />
      {!ready ? (
        <LoadingBlock />
      ) : !project ? (
        <div className="container py-5">
          <p>We couldn't find that project.</p>
          <Link to="/projects" className="btn">Back to Gallery</Link>
        </div>
      ) : (
        <section className="project-detail pt-145 pb-90">
          <div className="container">
            {project.image?.url && <img src={project.image.url} alt={project.title} style={{ width: '100%', marginBottom: 30 }} />}
            <h2>{project.title}</h2>
            <span>{project.category}</span>
            <p className="mt-20">{project.description}</p>
            {project.gallery?.length > 0 && (
              <div className="row mt-30">
                {project.gallery.map((g, i) => (
                  <div className="col-md-4" key={i}>
                    <img src={g.url} alt={`gallery ${i}`} style={{ width: '100%' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}