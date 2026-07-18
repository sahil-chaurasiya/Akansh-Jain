import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import LoadingBlock from '../components/LoadingBlock.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recent, setRecent] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    Promise.all([api.get(`/posts/slug/${slug}`), api.get('/posts?limit=5')])
      .then(([p, r]) => {
        setPost(p.data.data);
        setRecent(r.data.data);
      })
      .finally(() => setReady(true));
  }, [slug]);

  useLegacyScripts(ready, [post]);

  return (
    <Layout>
      <PageMeta pageKey={`post-${slug}`} fallbackTitle={`${post?.title || 'Blog'} - Natural Cosmetic Surgery Centre`} />
      <Breadcrumb title={post?.title || 'Blog Details'} />
      {!ready ? (
        <LoadingBlock />
      ) : !post ? (
        <div className="container py-5">
          <p>We couldn't find that article.</p>
          <Link to="/blog" className="btn">Back to Blog</Link>
        </div>
      ) : (
        <section className="inner-blog b-details-p pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {post.coverImage?.url && <img src={post.coverImage.url} alt={post.title} style={{ width: '100%', marginBottom: 30 }} />}
                <span>
                  {post.author} · {new Date(post.publishedAt).toLocaleDateString()} · {post.category}
                </span>
                <h2 className="mt-10">{post.title}</h2>
                <div className="mt-20" dangerouslySetInnerHTML={{ __html: post.body }} />
                {post.tags?.length > 0 && (
                  <div className="mt-20">
                    {post.tags.map((t) => (
                      <span key={t} className="tag mr-10">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <aside className="blog-sidebar">
                  <section id="recent-posts-4" className="widget widget_recent_entries">
                    <h4>Recent Posts</h4>
                    <ul>
                      {recent.filter((p) => p.slug !== slug).slice(0, 4).map((p) => (
                        <li key={p._id}>
                          <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}