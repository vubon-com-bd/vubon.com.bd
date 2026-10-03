import { OrderSnapshotGeneratorService } from '../../../../../src/module/infrastructure/services/internal/order-snapshot.service.js';
import { makeOrder } from '../../../application/services/_helpers.js';

describe('OrderSnapshotGeneratorService', () => {
  let service: OrderSnapshotGeneratorService;

  beforeEach(() => {
    service = new OrderSnapshotGeneratorService();
  });

  it('create() builds snapshot', () => {
    const order = makeOrder();
    const snap = service.create(order, { reason: 'test' });
    expect(snap.orderId).toBe(order.id);
    expect(snap.reason).toBe('test');
  });

  it('diff() returns changed fields', () => {
    const order = makeOrder();
    const before = service.create(order, { reason: 'before' });
    order.confirm(undefined, new Date().toISOString());
    const after = service.create(order, { reason: 'after' });
    expect(service.diff(before, after)).toContain('status');
  });

  it('isIdentical() true for same state', () => {
    const order = makeOrder();
    const a = service.create(order, { reason: 'r1' });
    const b = service.create(order, { reason: 'r2' });
    expect(service.isIdentical(a, b)).toBe(true);
  });
});
