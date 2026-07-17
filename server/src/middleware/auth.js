import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import AdminUser from '../models/AdminUser.js';

// Verifies the JWT and attaches req.admin. Rejects if missing/invalid/user gone.
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized: no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select('-passwordHash');
    if (!admin) {
      res.status(401);
      throw new Error('Not authorized: user no longer exists');
    }
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized: invalid or expired token');
  }
});

// Optional role gate, e.g. protectRole('superadmin')
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) {
    res.status(403);
    throw new Error('Forbidden: insufficient permissions');
  }
  next();
};
