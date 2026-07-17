// One-off script to create the first admin user.
// Usage: node src/utils/seedAdmin.js  (reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env)
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import mongoose from 'mongoose';

const run = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const name = process.env.ADMIN_NAME || 'Site Admin';

  const existing = await AdminUser.findOne({ email });
  if (existing) {
    console.log(`Admin user already exists for ${email}. No changes made.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.create({ name, email, passwordHash, role: 'superadmin' });

  console.log(`Created admin user:
  email: ${email}
  password: ${password}
Change this password after first login.`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
