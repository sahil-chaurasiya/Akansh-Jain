import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get('/posts')
      .then((res) => setPosts(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [posts]);

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filtered = search ? posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())) : posts;

  return (
    <Layout>
      <PageMeta pageKey="blog" fallbackTitle="Blog - Lustre" />
      <Breadcrumb title="Blog" />

      <section className="inner-blog pt-120 pb-105">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {filtered.map((p) => (
                  <div className="col-md-6" key={p._id}>
                    <div className="blog-box mb-30">
                      {p.coverImage?.url && <img src={p.coverImage.url} alt={p.title} style={{ width: '100%' }} />}
                      <span>{p.category}</span>
                      <h4 className="mt-10">
                        <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                      </h4>
                      <p>{p.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                <section id="search-3" className="widget widget_search">
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </section>
                <section id="categories-1" className="widget widget_categories">
                  <h4>Categories</h4>
                  <ul>
                    {categories.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </section>
                <section id="recent-posts-4" className="widget widget_recent_entries">
                  <h4>Recent Posts</h4>
                  <ul>
                    {posts.slice(0, 4).map((p) => (
                      <li key={p._id}>
                        <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="tag_cloud-1" className="widget widget_tag_cloud">
                  <h4>Tags</h4>
                  {[...new Set(posts.flatMap((p) => p.tags || []))].map((t) => (
                    <a href="#" key={t} className="tag">
                      {t}
                    </a>
                  ))}
                </section>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
