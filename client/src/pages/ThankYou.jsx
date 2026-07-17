import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function ThankYou() {
  useLegacyScripts(true, []);

  return (
    <Layout>
      <PageMeta pageKey="thank-you" fallbackTitle="Thank You - Lustre" />
      <Breadcrumb title="Thank You" />
      <section id="contact" className="contact-area after-none contact-bg pt-60 pb-120 p-relative fix">
        <div className="container text-center">
          <h2>Thank you for reaching out!</h2>
          <p>We've received your message and will get back to you shortly.</p>
          <Link to="/" className="btn mt-20">
            Back to Home <i className="fa-light fa-arrow-right-long"></i>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
