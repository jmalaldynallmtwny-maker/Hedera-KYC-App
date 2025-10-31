import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent') || 'unknown',
      contentLength: res.get('Content-Length') || '0'
    };

    // Color code based on status
    if (res.statusCode >= 500) {
      console.error('📕', logData);
    } else if (res.statusCode >= 400) {
      console.warn('📙', logData);
    } else if (res.statusCode >= 300) {
      console.info('📘', logData);
    } else {
      console.log('📗', logData);
    }
  });

  next();
};
