/**
 * Frontend Type Guards for safe type checking
 * Provides utility functions for type-safe error handling and type checking
 */

export function isError(error: unknown): error is Error {
  return error instanceof Error;
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

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error &&
    typeof (error as any).message === 'string' &&
    typeof (error as any).status === 'number'
  );
}

export function isValidBankId(bankId: unknown): bankId is string {
  return typeof bankId === 'string' && bankId.length > 0;
}

export function isValidNNI(nni: unknown): nni is string {
  return typeof nni === 'string' && /^\d{10}$/.test(nni);
}

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export function isHTMLVideoElement(value: unknown): value is HTMLVideoElement {
  return value instanceof HTMLVideoElement;
}

export function isHTMLCanvasElement(value: unknown): value is HTMLCanvasElement {
  return value instanceof HTMLCanvasElement;
}

export function isHTMLImageElement(value: unknown): value is HTMLImageElement {
  return value instanceof HTMLImageElement;
}

export function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: unknown): phone is string {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

export function isValidUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isNotEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isStringDate(dateString: unknown): dateString is string {
  if (typeof dateString !== 'string') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

export function hasProperty<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, unknown> {
  return isObject(obj) && prop in obj;
}

export function hasProperties<T extends string>(
  obj: unknown,
  props: T[]
): obj is Record<T, unknown> {
  return isObject(obj) && props.every(prop => prop in obj);
}





