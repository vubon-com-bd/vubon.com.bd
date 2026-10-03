/**
 * OrderReturnEntity tests
 */
import { OrderReturnEntity } from '../../../../src/module/domain/entities/order-return.entity.js';
import { ReturnReasonVO } from '../../../../src/module/domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../../src/module/domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_RETURN = 'r1111111-1111-4111-8111-111111111111';
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';

function makeReturn(reason = 'defective'): OrderReturnEntity {
  return OrderReturnEntity.create({
    id: UUID_RETURN,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      status: ReturnStatusVO.requested(),
      reason: ReturnReasonVO.create(reason),
      itemIds: [OrderItemIdVO.create(UUID_ITEM)],
      images: [],
      currency: 'BDT',
      requestedAt: NOW,
    },
  });
}

describe('OrderReturnEntity', () => {
  it('create()', () => {
    const r = makeReturn();
    expect(r.status.isRequested()).toBe(true);
    expect(r.itemCount).toBe(1);
  });

  it('throws on empty itemIds', () => {
    expect(() =>
      OrderReturnEntity.create({
        id: UUID_RETURN,
        now: NOW,
        props: {
          orderId: OrderIdVO.create(UUID_ORDER),
          customerId: CustomerIdVO.create(UUID_CUSTOMER),
          status: ReturnStatusVO.requested(),
          reason: ReturnReasonVO.create('defective'),
          itemIds: [],
          images: [],
          currency: 'BDT',
          requestedAt: NOW,
        },
      }),
    ).toThrow();
  });

  it('approve()', () => {
    const r = makeReturn();
    r.approve('admin-1', NOW);
    expect(r.status.isApproved()).toBe(true);
    expect(r.approvedAt).toBe(NOW);
  });

  it('reject()', () => {
    const r = makeReturn();
    r.reject('admin-1', 'outside window', NOW);
    expect(r.status.isFinal()).toBe(true);
  });

  it('full flow: requested → ... → refunded', () => {
    const r = makeReturn();
    r.approve('admin-1', NOW);
    r.pickUp('courier-1', NOW);
    r.receive('warehouse-1', NOW);
    r.inspect('ok', 'product damaged', NOW);
    r.complete(1500, 0, NOW);
    expect(r.status.isRefunded()).toBe(true);
    expect(r.refundAmount).toBe(1500);
  });

  it('close()', () => {
    const r = makeReturn();
    r.approve('admin-1', NOW);
    r.pickUp(undefined, NOW);
    r.receive(undefined, NOW);
    r.inspect('ok', undefined, NOW);
    r.complete(1000, 50, NOW);
    r.close('refunded', NOW);
    expect(r.closedAt).toBe(NOW);
  });

  it('netRefund = refundAmount - restockFee', () => {
    const r = makeReturn();
    r.approve('admin-1', NOW);
    r.pickUp(undefined, NOW);
    r.receive(undefined, NOW);
    r.inspect('ok', undefined, NOW);
    r.complete(1000, 50, NOW);
    expect(r.netRefund()).toBe(950);
  });

  it('isComplete() after final status', () => {
    const r = makeReturn();
    r.reject('admin-1', 'no', NOW);
    expect(r.isComplete).toBe(true);
  });
});
