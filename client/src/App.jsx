import { Routes, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import Faq from './pages/Faq.jsx';
import Contact from './pages/Contact.jsx';
import ThankYou from './pages/ThankYou.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin
import AdminLayout from './admin/components/AdminLayout.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import Login from './admin/pages/Login.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import ResourceList from './admin/pages/ResourceList.jsx';
import ResourceForm from './admin/pages/ResourceForm.jsx';
import SingletonEditor from './admin/pages/SingletonEditor.jsx';
import Submissions from './admin/pages/Submissions.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="singleton/:singletonKey" element={<SingletonEditor />} />
        <Route path="resource/:resourceKey" element={<ResourceList />} />
        <Route path="resource/:resourceKey/:id" element={<ResourceForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}