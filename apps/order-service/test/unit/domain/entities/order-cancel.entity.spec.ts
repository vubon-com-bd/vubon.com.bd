/**
 * OrderCancelEntity tests
 */
import { OrderCancelEntity } from '../../../../src/module/domain/entities/order-cancel.entity.js';
import { CancelReasonVO } from '../../../../src/module/domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../../src/module/domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_CANCEL = 'c1111111-1111-4111-8111-111111111111';
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const UUID_ADMIN = '99999999-9999-4999-8999-999999999999';

function makeCancel(): OrderCancelEntity {
  return OrderCancelEntity.create({
    id: UUID_CANCEL,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      reason: CancelReasonVO.create('customer_request'),
      status: CancelStatusVO.requested(),
      requestedBy: CustomerIdVO.create(UUID_CUSTOMER),
      currency: 'BDT',
      restockInventory: true,
      requestedAt: NOW,
    },
  });
}

describe('OrderCancelEntity', () => {
  it('create()', () => {
    const c = makeCancel();
    expect(c.status.isRequested()).toBe(true);
    expect(c.reason.value).toBe('customer_request');
  });

  it('approve() moves to approved and records refund', () => {
    const c = makeCancel();
    c.approve(CustomerIdVO.create(UUID_ADMIN), 1500, NOW);
    expect(c.status.isApproved()).toBe(true);
    expect(c.refundAmount).toBe(1500);
    expect(c.approvedBy?.value).toBe(UUID_ADMIN);
  });

  it('approve() throws from non-requested', () => {
    const c = makeCancel();
    c.approve(CustomerIdVO.create(UUID_ADMIN), 100, NOW);
    expect(() => c.approve(CustomerIdVO.create(UUID_ADMIN), 100, NOW)).toThrow();
  });

  it('reject()', () => {
    const c = makeCancel();
    c.reject(CustomerIdVO.create(UUID_ADMIN), 'already shipped', NOW);
    expect(c.status.isFinal()).toBe(true);
  });

  it('process() only after approved', () => {
    const c = makeCancel();
    expect(() => c.process(undefined, NOW)).toThrow();
    c.approve(CustomerIdVO.create(UUID_ADMIN), 100, NOW);
    c.process('refund-1', NOW);
    expect(c.processedAt).toBe(NOW);
  });

  it('hasRefund()', () => {
    const c = makeCancel();
    expect(c.hasRefund()).toBe(false);
    c.approve(CustomerIdVO.create(UUID_ADMIN), 100, NOW);
    expect(c.hasRefund()).toBe(true);
  });
});
