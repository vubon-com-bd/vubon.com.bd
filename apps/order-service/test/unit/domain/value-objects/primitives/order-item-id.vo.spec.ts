/**
 * OrderItemIdVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemIdVO } from '@domain/primitives/order-item-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('OrderItemIdVO', () => {
  describe('create', () => {
    it('creates from valid UUID', () => {
      expect(OrderItemIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });

    it('throws for empty', () => {
      expect(() => OrderItemIdVO.create('')).toThrow(ValidationError);
    });

    it('throws for non-UUID', () => {
      expect(() => OrderItemIdVO.create('abc')).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('accepts any non-empty value', () => {
      expect(OrderItemIdVO.reconstitute('legacy-id').value).toBe('legacy-id');
    });
  });
});
