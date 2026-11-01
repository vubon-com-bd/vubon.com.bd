import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { InvalidNotificationDataError } from '@domain/errors/notification.errors.js';

describe('NotificationDataVO', () => {
  describe('create()', () => {
    it('accepts plain object', () => {
      const vo = NotificationDataVO.create({ a: 1, b: 'two' });
      expect(vo.value).toEqual({ a: 1, b: 'two' });
    });

    it('undefined → empty object', () => {
      const vo = NotificationDataVO.create(undefined);
      expect(vo.value).toEqual({});
    });

    it('null → empty object', () => {
      const vo = NotificationDataVO.create(null);
      expect(vo.value).toEqual({});
    });

    it('freezes the object', () => {
      const vo = NotificationDataVO.create({ a: 1 });
      expect(Object.isFrozen(vo.value)).toBe(true);
    });

    it('rejects array', () => {
      expect(() => NotificationDataVO.create([1, 2] as any)).toThrow(InvalidNotificationDataError);
    });

    it('rejects primitive', () => {
      expect(() => NotificationDataVO.create('string' as any)).toThrow(InvalidNotificationDataError);
    });

    it('rejects >64KB payload', () => {
      const big = { data: 'a'.repeat(70_000) };
      expect(() => NotificationDataVO.create(big)).toThrow(InvalidNotificationDataError);
    });
  });

  describe('reconstitute', () => {
    it('accepts frozen', () => {
      const vo = NotificationDataVO.reconstitute(Object.freeze({ x: 1 }));
      expect(vo.value.x).toBe(1);
    });
  });

  describe('keyCount', () => {
    it('returns number of keys', () => {
      expect(NotificationDataVO.create({ a: 1, b: 2, c: 3 }).keyCount).toBe(3);
    });
    it('zero for empty', () => {
      expect(NotificationDataVO.create({}).keyCount).toBe(0);
    });
  });

  describe('has()', () => {
    it('true for existing key', () => {
      expect(NotificationDataVO.create({ x: 1 }).has('x')).toBe(true);
    });
    it('false for missing', () => {
      expect(NotificationDataVO.create({ x: 1 }).has('y')).toBe(false);
    });
  });

  describe('get()', () => {
    it('returns value for existing key', () => {
      expect(NotificationDataVO.create({ x: 42 }).get<number>('x')).toBe(42);
    });
    it('returns undefined for missing', () => {
      expect(NotificationDataVO.create({ x: 1 }).get('missing')).toBeUndefined();
    });
  });
});
