/**
 * ProductResponseSanitizerInterceptor — strips sensitive fields from responses.
 * @module product-service/interfaces/interceptors
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

const SENSITIVE_KEYS: readonly string[] = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'secret',
  'apiKey',
  'costPrice', // internal field not for public
  'internalNotes',
];

function sanitize<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((v) => sanitize(v)) as unknown as T;
  if (typeof value !== 'object') return value;

  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.includes(k)) continue;
    out[k] = sanitize(v);
  }
  return out as unknown as T;
}

@Injectable()
export class ProductResponseSanitizerInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => sanitize(data)));
  }
}
