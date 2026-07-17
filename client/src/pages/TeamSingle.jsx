import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import LoadingBlock from '../components/LoadingBlock.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function TeamSingle() {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    api
      .get(`/team-members/slug/${slug}`)
      .then((res) => setMember(res.data.data))
      .finally(() => setReady(true));
  }, [slug]);

  useLegacyScripts(ready, [member]);

  return (
    <Layout>
      <PageMeta pageKey={`team-${slug}`} fallbackTitle={`${member?.name || 'Team Member'} - Lustre`} />
      <Breadcrumb title={member?.name || 'Team Details'} />
      {!ready ? (
        <LoadingBlock />
      ) : !member ? (
        <div className="container py-5">
          <p>We couldn't find that team member.</p>
          <Link to="/team" className="btn">Back to Team</Link>
        </div>
      ) : (
        <section className="team-area-content pt-150 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <img src={member.photo?.url || '/assets/img/team/team-img1.jpg'} alt={member.name} style={{ width: '100%' }} />
              </div>
              <div className="col-lg-8">
                <h2>{member.name}</h2>
                <span>{member.role}</span>
                <p className="mt-20">{member.bio}</p>
                {member.socialLinks?.length > 0 && (
                  <ul className="social-icon mt-15">
                    {member.socialLinks.map((s, i) => (
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
          </div>
        </section>
      )}
    </Layout>
  );
}
