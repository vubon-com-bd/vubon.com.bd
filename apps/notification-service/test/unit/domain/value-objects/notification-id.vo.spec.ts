/**
 * NotificationIdVO — validation tests
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationIdVO } from '../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

describe('NotificationIdVO', () => {
  describe('create', () => {
    it('should create a valid NotificationIdVO from a UUID', () => {
      const vo = NotificationIdVO.create(FIXED_NOTIFICATION_ID);
      expect(vo.value).toBe(FIXED_NOTIFICATION_ID);
    });

    it('should trim whitespace', () => {
      const vo = NotificationIdVO.create(`  ${FIXED_NOTIFICATION_ID}  `);
      expect(vo.value).toBe(FIXED_NOTIFICATION_ID);
    });

    it('should throw on empty string', () => {
      expect(() => NotificationIdVO.create('')).toThrow();
    });

    it('should throw on whitespace-only string', () => {
      expect(() => NotificationIdVO.create('   ')).toThrow();
    });

    it('should throw on non-UUID string', () => {
      expect(() => NotificationIdVO.create('not-a-uuid')).toThrow();
    });

    it('should throw on malformed UUID', () => {
      expect(() => NotificationIdVO.create('00000000-0000-0000-0000')).toThrow();
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute without validation', () => {
      const vo = NotificationIdVO.reconstitute('any-string');
      expect(vo.value).toBe('any-string');
    });
  });

  describe('equals', () => {
    it('should return true for same value', () => {
      const a = NotificationIdVO.create(FIXED_NOTIFICATION_ID);
      const b = NotificationIdVO.create(FIXED_NOTIFICATION_ID);
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for different values', () => {
      const a = NotificationIdVO.create(FIXED_NOTIFICATION_ID);
      const b = NotificationIdVO.reconstitute('11111111-1111-1111-1111-111111111111');
      expect(a.equals(b)).toBe(false);
    });
  });
});
