/**
 * OrderReturnVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderReturnVO } from '@domain/composites/order-return.vo.js';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '@domain/primitives/return-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureReturnId,
  fixtureOrderId,
  fixtureCustomerId,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderReturnVO.create>[0]> = {}) {
  return {
    id: fixtureReturnId,
    orderId: fixtureOrderId,
    customerId: fixtureCustomerId,
    reason: ReturnReasonVO.create('defective'),
    status: ReturnStatusVO.requested(),
    itemIds: ['item-1', 'item-2'],
    requestedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderReturnVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderReturnVO.create(makeProps());
      expect(vo.itemCount).toBe(2);
      expect(vo.status.isRequested()).toBe(true);
    });

    it('creates with images', () => {
      const vo = OrderReturnVO.create(
        makeProps({ imageUrls: ['https://example.com/img1.jpg'] }),
      );
      expect(vo.hasImages()).toBe(true);
    });

    it('throws for empty itemIds', () => {
      expect(() => OrderReturnVO.create(makeProps({ itemIds: [] }))).toThrow(ValidationError);
    });

    it('throws for notes > 1000 chars', () => {
      expect(() => OrderReturnVO.create(makeProps({ notes: 'a'.repeat(1001) }))).toThrow(
        ValidationError,
      );
    });

    it('throws for > 5 images', () => {
      expect(() =>
        OrderReturnVO.create(
          makeProps({ imageUrls: Array(6).fill('https://example.com/img.jpg') }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('business methods', () => {
    it('isPending true for requested', () => {
      const vo = OrderReturnVO.create(makeProps());
      expect(vo.isPending()).toBe(true);
    });

    it('isTerminal false for requested', () => {
      const vo = OrderReturnVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isTerminal true for closed', () => {
      const vo = OrderReturnVO.create(
        makeProps({ status: ReturnStatusVO.create('closed') }),
      );
      expect(vo.isTerminal()).toBe(true);
    });

    it('hasImages false without images', () => {
      const vo = OrderReturnVO.create(makeProps());
      expect(vo.hasImages()).toBe(false);
    });
  });
});
