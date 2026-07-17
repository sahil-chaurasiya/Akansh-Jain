import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';

export default function NotFound() {
  return (
    <Layout>
      <Breadcrumb title="Page Not Found" />
      <div className="container py-5 text-center">
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn mt-20">Back to Home</Link>
      </div>
    </Layout>
  );
}
