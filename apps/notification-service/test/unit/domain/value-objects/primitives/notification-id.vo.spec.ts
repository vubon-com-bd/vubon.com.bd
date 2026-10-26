import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('NotificationIdVO', () => {
  describe('create()', () => {
    it('accepts valid UUID', () => {
      const vo = NotificationIdVO.create(IDS.notificationId);
      expect(vo.value).toBe(IDS.notificationId);
    });

    it('trims whitespace', () => {
      expect(NotificationIdVO.create(`  ${IDS.notificationId}  `).value).toBe(IDS.notificationId);
    });

    it('rejects empty string', () => {
      expect(() => NotificationIdVO.create('')).toThrow(ValidationError);
    });

    it('rejects whitespace-only', () => {
      expect(() => NotificationIdVO.create('   ')).toThrow(ValidationError);
    });

    it('rejects non-UUID', () => {
      expect(() => NotificationIdVO.create('not-a-uuid')).toThrow(ValidationError);
    });

    it('rejects null', () => {
      expect(() => NotificationIdVO.create(null as any)).toThrow(ValidationError);
    });

    it('rejects numeric input', () => {
      expect(() => NotificationIdVO.create(12345 as any)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('accepts any string (trust DB)', () => {
      const vo = NotificationIdVO.reconstitute('any-non-uuid-string');
      expect(vo.value).toBe('any-non-uuid-string');
    });
  });

  describe('equality', () => {
    it('two same values are equal', () => {
      const a = NotificationIdVO.create(IDS.notificationId);
      const b = NotificationIdVO.create(IDS.notificationId);
      expect(a.equals(b)).toBe(true);
    });

    it('different values are not equal', () => {
      const a = NotificationIdVO.create(IDS.notificationId);
      const b = NotificationIdVO.create(IDS.notificationId2);
      expect(a.equals(b)).toBe(false);
    });
  });
});
