import { describe, it, expect } from '@jest/globals';
import { FulfillmentIdVO } from '@domain/primitives/fulfillment-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('FulfillmentIdVO', () => {
  it('creates from valid UUID', () => {
    expect(FulfillmentIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => FulfillmentIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => FulfillmentIdVO.create('abc')).toThrow(ValidationError);
  });
});
