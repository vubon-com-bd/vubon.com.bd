import { describe, it, expect } from '@jest/globals';
import { NotificationReferenceVO } from '../../../../../src/module/domain/value-objects/composites/notification-reference.vo.js';

describe('NotificationReferenceVO', () => {
  it('create valid', () => {
    const vo = NotificationReferenceVO.create({ type: 'order', id: '123' });
    expect(vo.isOrder()).toBe(true);
  });
  it('create payment', () => {
    expect(NotificationReferenceVO.create({ type: 'payment', id: '1' }).isPayment()).toBe(true);
  });
  it('create product', () => {
    expect(NotificationReferenceVO.create({ type: 'product', id: '1' }).isProduct()).toBe(true);
  });
  it('create shipment', () => {
    expect(NotificationReferenceVO.create({ type: 'shipment', id: '1' }).isShipment()).toBe(true);
  });
  it('rejects invalid type format', () => {
    expect(() => NotificationReferenceVO.create({ type: 'Bad Type', id: '1' })).toThrow();
  });
  it('rejects empty id', () => {
    expect(() => NotificationReferenceVO.create({ type: 'order', id: '' })).toThrow();
  });
  it('rejects id > 100', () => {
    expect(() => NotificationReferenceVO.create({ type: 'order', id: 'x'.repeat(101) })).toThrow();
  });
  it('reconstitute', () => {
    const vo = NotificationReferenceVO.reconstitute({ type: 'order', id: 'x' });
    expect(vo.id).toBe('x');
  });
});
