/**
 * NotificationChannelVO — validation + predicates tests
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';

describe('NotificationChannelVO', () => {
  describe('create', () => {
    it('should create email', () => {
      expect(NotificationChannelVO.create('email').value).toBe('email');
    });

    it('should create sms', () => {
      expect(NotificationChannelVO.create('sms').value).toBe('sms');
    });

    it('should throw on invalid channel', () => {
      expect(() => NotificationChannelVO.create('pigeon')).toThrow();
    });
  });

  describe('named constructors', () => {
    it('should build email', () => {
      expect(NotificationChannelVO.email().value).toBe('email');
    });

    it('should build push', () => {
      expect(NotificationChannelVO.push().value).toBe('push');
    });

    it('should build inApp', () => {
      expect(NotificationChannelVO.inApp().value).toBe('in_app');
    });
  });

  describe('predicates', () => {
    it('should detect email', () => {
      expect(NotificationChannelVO.email().isEmail()).toBe(true);
      expect(NotificationChannelVO.sms().isEmail()).toBe(false);
    });

    it('should detect sms', () => {
      expect(NotificationChannelVO.sms().isSms()).toBe(true);
    });

    it('should detect instant channels (push, in_app)', () => {
      expect(NotificationChannelVO.push().isInstant()).toBe(true);
      expect(NotificationChannelVO.inApp().isInstant()).toBe(true);
      expect(NotificationChannelVO.email().isInstant()).toBe(false);
    });

    it('should detect device-token requirement', () => {
      expect(NotificationChannelVO.push().requiresDeviceToken()).toBe(true);
      expect(NotificationChannelVO.email().requiresDeviceToken()).toBe(false);
    });

    it('should detect email requirement', () => {
      expect(NotificationChannelVO.email().requiresEmail()).toBe(true);
      expect(NotificationChannelVO.sms().requiresEmail()).toBe(false);
    });

    it('should detect phone requirement', () => {
      expect(NotificationChannelVO.sms().requiresPhone()).toBe(true);
      expect(NotificationChannelVO.whatsapp().requiresPhone()).toBe(true);
      expect(NotificationChannelVO.voice().requiresPhone()).toBe(true);
      expect(NotificationChannelVO.email().requiresPhone()).toBe(false);
    });
  });
});
