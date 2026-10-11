import { describe, it, expect } from '@jest/globals';
import { NotificationDataVO } from '../../../../src/module/domain/value-objects/primitives/notification-data.vo.js';

describe('NotificationDataVO', () => {
  it('create valid', () => {
    const vo = NotificationDataVO.create({ orderId: '123' });
    expect(vo.get('orderId')).toBe('123');
  });
  it('rejects array', () => {
    expect(() => NotificationDataVO.create([] as never)).toThrow();
  });
  it('rejects null', () => {
    expect(() => NotificationDataVO.create(null as never)).toThrow();
  });
  it('empty factory', () => {
    expect(NotificationDataVO.empty().isEmpty()).toBe(true);
  });
  it('reconstitute', () => {
    expect(NotificationDataVO.reconstitute({ a: 1 }).get('a')).toBe(1);
  });
  it('keys/has', () => {
    const vo = NotificationDataVO.create({ a: 1, b: 2 });
    expect(vo.keys.length).toBe(2);
    expect(vo.has('a')).toBe(true);
    expect(vo.has('z')).toBe(false);
  });
});
