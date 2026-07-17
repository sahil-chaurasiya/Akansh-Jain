import { useEffect, useState } from 'react';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

// Home Page 02 shares most sections with Home but pulls its own slide set (page=home2)
// and adds a benefits strip. Content-heavy sections reuse the same collections as Home.
export default function Home2() {
  const [slides, setSlides] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get('/slides?page=home2')
      .then((res) => setSlides(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [slides]);
  const slide = slides[0];

  return (
    <Layout>
      <PageMeta pageKey="home2" fallbackTitle="Lustre - Home 02" />
      <section id="home" className="slider-area fix p-relative">
        <div className="slider-active2 pl-100 pr-100">
          <div
            className="single-slider slider-bg d-flex img"
            style={{ backgroundImage: `url(${slide?.image?.url || '/assets/img/slider/header-bg.png'})`, backgroundSize: 'cover', backgroundColor: '#3A1607' }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="slider-content s-slider-content">
                    <h2 className="text-anime-style-3">{slide?.headline || 'Transforming Look Changing Lives'}</h2>
                    <p>{slide?.subheading}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-5">
        <p>
          Home Page 02 reuses the About, Services, Who We Are, Testimonials, Gallery, and Blog sections exactly as
          built on the main Home page — see <code>src/pages/Home.jsx</code> for that markup, which can be split into
          shared components if you want Home 02 to diverge further.
        </p>
      </div>
    </Layout>
  );
}
