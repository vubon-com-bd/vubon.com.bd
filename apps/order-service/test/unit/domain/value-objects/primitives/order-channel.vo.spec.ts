/**
 * OrderChannelVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderChannelVO } from '@domain/primitives/order-channel.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderChannelVO', () => {
  describe('create', () => {
    it.each(['web', 'mobile_app', 'pos', 'api', 'phone', 'marketplace', 'social', 'admin'])(
      'accepts "%s"',
      (c) => expect(OrderChannelVO.create(c).value).toBe(c),
    );
    it('normalizes to lowercase', () => {
      expect(OrderChannelVO.create('WEB').value).toBe('web');
      expect(OrderChannelVO.create('MOBILE_APP').value).toBe('mobile_app');
    });
    it('trims whitespace', () => {
      expect(OrderChannelVO.create('  web  ').value).toBe('web');
    });
    it('throws for invalid channel', () => {
      expect(() => OrderChannelVO.create('invalid')).toThrow(ValidationError);
      expect(() => OrderChannelVO.create('invalid')).toThrow('Invalid OrderChannel');
    });
    it('throws for empty string', () => {
      expect(() => OrderChannelVO.create('')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => OrderChannelVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderChannelVO.reconstitute('legacy_channel').value).toBe('legacy_channel');
    });
  });

  describe('isOnline', () => {
    it('true for web/mobile_app/api', () => {
      expect(OrderChannelVO.create('web').isOnline()).toBe(true);
      expect(OrderChannelVO.create('mobile_app').isOnline()).toBe(true);
      expect(OrderChannelVO.create('api').isOnline()).toBe(true);
    });
    it('false for offline channels', () => {
      expect(OrderChannelVO.create('pos').isOnline()).toBe(false);
      expect(OrderChannelVO.create('phone').isOnline()).toBe(false);
      expect(OrderChannelVO.create('marketplace').isOnline()).toBe(false);
      expect(OrderChannelVO.create('social').isOnline()).toBe(false);
      expect(OrderChannelVO.create('admin').isOnline()).toBe(false);
    });
  });
});
