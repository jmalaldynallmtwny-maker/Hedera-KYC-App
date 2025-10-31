/**
 * Type guards for error handling with strict TypeScript mode
 * Provides safe error extraction and type checking
 */

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isAppError(error: unknown): error is import('../middleware/errorHandler.js').AppError {
  return error instanceof Error && 'statusCode' in error;
}

export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function getErrorStack(error: unknown): string | undefined {
  if (isError(error)) {
    return error.stack;
  }
  return undefined;
}

export function getErrorCode(error: unknown): string | undefined {
  if (isError(error) && 'code' in error) {
    return (error as any).code;
  }
  return undefined;
}

/**
 * Safe error handler for async functions
 * Executes a function and returns a fallback value on error
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error('Safe async error:', getErrorMessage(error));
    return fallback;
  }
}

/**
 * Safe synchronous function execution
 */
export function safeSync<T>(
  fn: () => T,
  fallback: T
): T {
  try {
    return fn();
  } catch (error) {
    console.error('Safe sync error:', getErrorMessage(error));
    return fallback;
  }
}





