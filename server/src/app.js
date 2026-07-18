import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';
import navItemRoutes from './routes/navItemRoutes.js';
import slideRoutes from './routes/slideRoutes.js';
import aboutSectionRoutes from './routes/aboutSectionRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import whoWeAreRoutes from './routes/whoWeAreRoutes.js';
import howItWorkStepRoutes from './routes/howItWorkStepRoutes.js';
import bookingSectionRoutes from './routes/bookingSectionRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import galleryItemRoutes from './routes/galleryItemRoutes.js';
import brandLogoRoutes from './routes/brandLogoRoutes.js';
import postRoutes from './routes/postRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import faqItemRoutes from './routes/faqItemRoutes.js';
import contactInfoRoutes from './routes/contactInfoRoutes.js';
import pageMetaRoutes from './routes/pageMetaRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// --- Security & core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// // Global API rate limit (separate, stricter limit is applied on public form routes)
// app.use(
//   '/api',
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 300,
//     standardHeaders: true,
//     legacyHeaders: false,
//   })
// );

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Natural Cosmetic Surgery Centre API is running', time: new Date().toISOString() });
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/nav-items', navItemRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/about-section', aboutSectionRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/who-we-are', whoWeAreRoutes);
app.use('/api/how-it-work-steps', howItWorkStepRoutes);
app.use('/api/booking-section', bookingSectionRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery-items', galleryItemRoutes);
app.use('/api/brand-logos', brandLogoRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/faq-items', faqItemRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/page-meta', pageMetaRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Natural Cosmetic Surgery Centre API listening on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
});

export default app;