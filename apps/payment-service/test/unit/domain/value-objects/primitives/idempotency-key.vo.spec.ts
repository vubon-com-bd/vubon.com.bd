import { IdempotencyKeyVO } from '../../../../../src/module/domain/value-objects/primitives/idempotency-key.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('IdempotencyKeyVO', () => {
  it('creates valid key', () => {
    const vo = IdempotencyKeyVO.create('idem_abc12345');
    expect(vo.value).toBe('idem_abc12345');
  });

  it('trims whitespace', () => {
    expect(IdempotencyKeyVO.create('  idem_abc12345  ').value).toBe('idem_abc12345');
  });

  it('rejects too short (min 8)', () => {
    expect(() => IdempotencyKeyVO.create('abc')).toThrow(ValidationError);
  });

  it('rejects too long (max 128)', () => {
    expect(() => IdempotencyKeyVO.create('a'.repeat(129))).toThrow(ValidationError);
  });

  it('rejects invalid chars', () => {
    expect(() => IdempotencyKeyVO.create('idem abc 123!@#')).toThrow(ValidationError);
  });

  it('accepts A-Z a-z 0-9 _ - : .', () => {
    expect(() => IdempotencyKeyVO.create('Abc123_-. :'.replace(/\s/g, ''))).not.toThrow();
  });
});
