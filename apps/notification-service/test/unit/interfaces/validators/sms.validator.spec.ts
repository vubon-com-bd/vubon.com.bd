/**
 * SmsHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 */
import { describe, expect, it } from '@jest/globals';
import { SmsHttpValidator } from '@interfaces/validators/sms.validator.js';

describe('SmsHttpValidator', () => {
  describe('validateSend', () => {
    it('rejects null', () => {
      expect(() => SmsHttpValidator.validateSend(null)).toThrow('SMS body is required');
    });

    it('rejects missing to', () => {
      expect(() => SmsHttpValidator.validateSend({})).toThrow('SMS "to" is required');
    });

    it('rejects empty message', () => {
      expect(() =>
        SmsHttpValidator.validateSend({ to: '+8801712345678', message: '' }),
      ).toThrow('SMS message is required');
    });

    it('rejects missing type', () => {
      expect(() =>
        SmsHttpValidator.validateSend({ to: '+8801712345678', message: 'hi' }),
      ).toThrow('SMS type is required');
    });

    it('accepts valid', () => {
      expect(() =>
        SmsHttpValidator.validateSend({
          to: '+8801712345678',
          message: 'hi',
          type: 'transactional',
        }),
      ).not.toThrow();
    });
  });

  describe('validateBulk', () => {
    it('rejects null', () => {
      expect(() => SmsHttpValidator.validateBulk(null)).toThrow(
        'Bulk SMS body is required',
      );
    });

    it('rejects empty recipients', () => {
      expect(() => SmsHttpValidator.validateBulk({ recipients: [] })).toThrow(
        'Bulk SMS recipients are required',
      );
    });

    it('rejects when neither top nor per-recipient has message', () => {
      expect(() =>
        SmsHttpValidator.validateBulk({ recipients: [{ phone: '+880' }] }),
      ).toThrow('Either top-level message or per-recipient messages required');
    });

    it('accepts top-level message', () => {
      expect(() =>
        SmsHttpValidator.validateBulk({
          recipients: [{ phone: '+880' }],
          message: 'hi',
        }),
      ).not.toThrow();
    });

    it('accepts per-recipient messages', () => {
      expect(() =>
        SmsHttpValidator.validateBulk({
          recipients: [{ phone: '+880', message: 'hi' }],
        }),
      ).not.toThrow();
    });
  });
});
