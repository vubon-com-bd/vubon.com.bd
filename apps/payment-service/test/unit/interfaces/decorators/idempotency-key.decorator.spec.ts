/**
 * @IdempotencyHeader() — unit tests (uses exported helper)
 */
import { describe, it, expect } from '@jest/globals';
import {
  IdempotencyHeader,
  extractIdempotencyKey,
} from '@interfaces/decorators/idempotency-key.decorator';

describe('IdempotencyHeader decorator', () => {
  it('exports a decorator (function)', () => {
    expect(typeof IdempotencyHeader).toBe('function');
  });
});

describe('extractIdempotencyKey (helper)', () => {
  it('returns value from idempotency-key header', () => {
    expect(extractIdempotencyKey({ 'idempotency-key': 'key-123' })).toBe('key-123');
  });

  it('falls back to x-idempotency-key header', () => {
    expect(extractIdempotencyKey({ 'x-idempotency-key': 'key-456' })).toBe('key-456');
  });

  it('returns undefined when header is missing', () => {
    expect(extractIdempotencyKey({})).toBeUndefined();
  });

  it('returns first item when header is array', () => {
    expect(extractIdempotencyKey({ 'idempotency-key': ['key-789'] })).toBe('key-789');
  });

  it('returns undefined when array is empty', () => {
    expect(extractIdempotencyKey({ 'idempotency-key': [] })).toBeUndefined();
  });
});
