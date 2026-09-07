import { ERROR_CODE } from '@vubon/shared-constants';

export type ErrorCode = keyof typeof ERROR_CODE;

// বেস এরর ইন্টারফেস
export interface AppError {
  code: ErrorCode | string;
  message: string;
  details?: unknown;
  stack?: string;
  timestamp: Date;
}

// এরর তৈরি করার জন্য হেল্পার টাইপ
export type ErrorDetails = Record<string, unknown> | unknown[] | string | number | boolean | null;

// ভ্যালিডেশন এরর
export interface ValidationError extends AppError {
  details: {
    field: string;
    message: string;
    value?: unknown;
  }[];
}

// ডাটাবেস এরর
export interface DatabaseError extends AppError {
  details: {
    query?: string;
    params?: unknown[];
    constraint?: string;
  };
}

// নেটওয়ার্ক এরর
export interface NetworkError extends AppError {
  details: {
    statusCode?: number;
    statusText?: string;
    url?: string;
    method?: string;
  };
}

// অথরাইজেশন এরর
export interface AuthorizationError extends AppError {
  details: {
    userId?: string;
    role?: string;
    requiredPermissions?: string[];
    resource?: string;
  };
}

// নট ফাউন্ড এরর
export interface NotFoundError extends AppError {
  details: {
    resource: string;
    id?: string | number;
    field?: string;
  };
}

// অ্যাপ্লিকেশন এরর টাইপ
export type AppErrorType =
  ValidationError | DatabaseError | NetworkError | AuthorizationError | NotFoundError | AppError;

// এরর রেসপন্স
export interface ErrorResponse {
  success: false;
  error: AppError;
  timestamp: Date;
}

// এরর ফ্যাক্টরি ফাংশনের টাইপ
export type ErrorFactory<T extends AppError = AppError> = (message: string, details?: unknown) => T;

// এরর হ্যান্ডলিং অপশন
export interface ErrorHandlingOptions {
  log?: boolean;
  throw?: boolean;
  fallback?: unknown;
  context?: Record<string, unknown>;
}
