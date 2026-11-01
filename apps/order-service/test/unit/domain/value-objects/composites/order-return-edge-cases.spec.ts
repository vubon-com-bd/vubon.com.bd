/**
 * OrderReturnVO edge cases
 * @module order-service/test/unit/domain/value-objects/composites
 *
 * Covers lines 39, 56-57, 59, 62, 64 (validation branches + getters).
 */
import { describe, it, expect } from '@jest/globals';
import { OrderReturnVO } from '@domain/composites/order-return.vo.js';
import { ReturnIdVO } from '@domain/primitives/return-id.vo.js';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '@domain/primitives/return-status.vo.js';
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { CustomerIdVO } from '@domain/primitives/customer-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ID = '550e8400-e29b-41d4-a716-446655440000';
const ID_2 = '660f9511-f3ac-52e5-b827-557766551111';

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: ReturnIdVO.create(ID),
    orderId: OrderIdVO.create(ID_2),
    customerId: CustomerIdVO.create(ID),
    reason: ReturnReasonVO.create('defective'),
    status: ReturnStatusVO.requested(),
    itemIds: [ID],
    notes: 'Broken',
    requestedAt: '2024-06-15T10:00:00.000Z',
    ...overrides,
  };
}

describe('OrderReturnVO edge cases', () => {
  it('throws when itemIds empty', () => {
    expect(() => OrderReturnVO.create(makeProps({ itemIds: [] }) as never)).toThrow(
      ValidationError,
    );
  });

  it('throws when notes too long', () => {
    const longNotes = 'x'.repeat(1001);
    expect(() =>
      OrderReturnVO.create(makeProps({ notes: longNotes }) as never),
    ).toThrow(ValidationError);
  });

  it('throws when more than 5 images', () => {
    const images = Array.from({ length: 6 }, (_, i) => `https://img${i}.com/a.jpg`);
    expect(() =>
      OrderReturnVO.create(makeProps({ imageUrls: images }) as never),
    ).toThrow(ValidationError);
  });

  it('isPending returns true for requested status', () => {
    const vo = OrderReturnVO.create(makeProps() as never);
    expect(vo.isPending()).toBe(true);
  });

  it('isTerminal returns false for requested status', () => {
    const vo = OrderReturnVO.create(makeProps() as never);
    expect(vo.isTerminal()).toBe(false);
  });

  it('itemCount returns length', () => {
    const vo = OrderReturnVO.create(makeProps() as never);
    expect(vo.itemCount).toBe(1);
  });

  it('hasImages returns false when no images', () => {
    const vo = OrderReturnVO.create(makeProps() as never);
    expect(vo.hasImages()).toBe(false);
  });

  it('hasImages returns true when images present', () => {
    const vo = OrderReturnVO.create(
      makeProps({ imageUrls: ['https://img.com/a.jpg'] }) as never,
    );
    expect(vo.hasImages()).toBe(true);
  });
});
