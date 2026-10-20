import { describe, it, expect } from '@jest/globals';
import { TrackingIdVO } from '@domain/primitives/tracking-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('TrackingIdVO', () => {
  it('creates from valid UUID', () => {
    expect(TrackingIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => TrackingIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => TrackingIdVO.create('abc')).toThrow(ValidationError);
  });
});
