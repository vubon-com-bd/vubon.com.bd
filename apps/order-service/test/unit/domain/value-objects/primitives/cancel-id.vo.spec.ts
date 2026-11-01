import { describe, it, expect } from '@jest/globals';
import { CancelIdVO } from '@domain/primitives/cancel-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('CancelIdVO', () => {
  it('creates from valid UUID', () => {
    expect(CancelIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => CancelIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => CancelIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(CancelIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
