import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import csrf from 'csurf';

import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

// Routes
import authRoutes from './routes/auth.js';
import kycRoutes from './routes/kyc.js';
import adminRoutes from './routes/admin.js';
import healthRoutes from './routes/health.js';
import asrRoutes from './routes/asr.js';
import llmRoutes from './routes/llm.js';
import statusRoutes from './routes/status.js';
import exportRoutes from './routes/export.js';
import hederaRoutes from './routes/hedera.js';

export const app = express();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/webm'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'));
    }
  }
});

// =============================================
// Security Headers (Helmet)
// =============================================
app.use(helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for UI
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:"], // Allow data URIs for images
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "blob:"], // Allow blob URLs for audio/video
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  // Cross-Origin policies
  crossOriginEmbedderPolicy: false, // Disable if needed for external resources
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  
  // HTTP Strict Transport Security
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  
  // Other security headers
  noSniff: true, // X-Content-Type-Options: nosniff
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true, // X-XSS-Protection (legacy but doesn't hurt)
  hidePoweredBy: true, // Remove X-Powered-By header
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// =============================================
// CSRF Protection
// =============================================
const csrfProtection = csrf({ 
  cookie: {
    key: '_csrf',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600 // 1 hour
  }
});

// Apply CSRF to state-changing routes (POST, PUT, DELETE, PATCH)
app.use((req, res, next) => {
  // Skip CSRF for:
  // - GET/HEAD/OPTIONS requests (safe methods)
  // - Health check endpoint
  // - Webhook endpoints (if any)
  if (
    req.method === 'GET' || 
    req.method === 'HEAD' || 
    req.method === 'OPTIONS' ||
    req.path === '/api/health' ||
    req.path.startsWith('/api/webhooks/')
  ) {
    return next();
  }
  
  // Apply CSRF protection to all other routes
  return csrfProtection(req, res, next);
});

// Endpoint to get CSRF token (important for frontend)
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ 
    csrfToken: req.csrfToken(),
    expiresIn: 3600 // seconds
  });
});

// Logging middleware
app.use(requestLogger);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/asr', asrRoutes); // Multer applied in route handler
app.use('/api/llm', llmRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/hedera', hederaRoutes);

// Export upload middleware for use in other routes if needed
export { upload };

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Interactive KYC Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
