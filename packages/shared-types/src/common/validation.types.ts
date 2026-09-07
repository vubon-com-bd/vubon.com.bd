import { VALIDATION } from '@vubon/shared-constants';

export interface ValidationRule {
  field: string;
  rule: string;
  params?: unknown[];
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  rule: string;
  value?: unknown;
}

export type ValidationType = keyof typeof VALIDATION;

// ভ্যালিডেশন রুল তৈরির জন্য হেল্পার টাইপ
export type RuleParams =
  string | number | boolean | null | undefined | unknown[] | Record<string, unknown>;

// ভ্যালিডেশন স্কিমা
export interface ValidationSchema {
  fields: Record<string, ValidationRule[]>;
  options?: {
    abortEarly?: boolean;
    allowUnknown?: boolean;
    stripUnknown?: boolean;
  };
}

// ভ্যালিডেশন কন্টেক্সট
export interface ValidationContext {
  value: unknown;
  path: string;
  parent?: Record<string, unknown>;
  root?: Record<string, unknown>;
  rule: ValidationRule;
}

// ভ্যালিডেশন রেজাল্ট ফরম্যাটার
export type ValidationResultFormatter = (errors: ValidationError[]) => Record<string, string[]>;

// অ্যাসিনক্রোনাস ভ্যালিডেশন ফাংশন টাইপ
export type AsyncValidator<T = unknown> = (
  value: T,
  context?: ValidationContext
) => Promise<ValidationResult>;

// সিঙ্ক্রোনাস ভ্যালিডেশন ফাংশন টাইপ
export type SyncValidator<T = unknown> = (
  value: T,
  context?: ValidationContext
) => ValidationResult;

// কম্পোজিট ভ্যালিডেটর
export interface CompositeValidator<T = unknown> {
  validators: Array<SyncValidator<T> | AsyncValidator<T>>;
  mode: 'all' | 'any' | 'sequence';
}

// ভ্যালিডেশন ইভেন্টস
export interface ValidationEvents {
  onStart?: (field: string) => void;
  onSuccess?: (field: string, value: unknown) => void;
  onError?: (field: string, error: ValidationError) => void;
  onComplete?: (result: ValidationResult) => void;
}

// ভ্যালিডেশন কনফিগারেশন
export interface ValidationConfig {
  locale?: string;
  strict?: boolean;
  coerce?: boolean;
  events?: ValidationEvents;
}

// ভ্যালু ট্রান্সফরমার
export type ValueTransformer<T = unknown> = (value: unknown) => T;

// ভ্যালিডেশন রিপোর্ট
export interface ValidationReport extends ValidationResult {
  timestamp: Date;
  duration?: number;
  fieldsValidated: number;
  rulesApplied: number;
}
