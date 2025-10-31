import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { AppError } from './errorHandler.js';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        next(new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400));
      } else {
        next(error);
      }
    }
  };
};

// Common validation schemas
export const schemas = {
  nni: z.string().min(8).max(12).regex(/^\d+$/, 'NNI must contain only digits'),
  uuid: z.string().uuid('Invalid UUID format'),
  bankId: z.enum(['baybank', 'oasisbank', 'zenbank', 'arcbank', 'nexbank'], {
    errorMap: () => ({ message: 'Invalid bank ID' })
  }),
  vote: z.enum(['APPROVE', 'REJECT'], {
    errorMap: () => ({ message: 'Vote must be APPROVE or REJECT' })
  })
};
