/**
 * PushHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 */
import { describe, expect, it } from '@jest/globals';
import { PushHttpValidator } from '@interfaces/validators/push.validator.js';

describe('PushHttpValidator', () => {
  describe('validateSend', () => {
    it('rejects null', () => {
      expect(() => PushHttpValidator.validateSend(null)).toThrow('Push body is required');
    });

    it('rejects empty tokens', () => {
      expect(() => PushHttpValidator.validateSend({ tokens: [] })).toThrow(
        'Push tokens are required',
      );
    });

    it('rejects missing title', () => {
      expect(() =>
        PushHttpValidator.validateSend({ tokens: ['tok'], body: 'x' }),
      ).toThrow('Push title is required');
    });

    it('rejects missing body text', () => {
      expect(() =>
        PushHttpValidator.validateSend({ tokens: ['tok'], title: 'x' }),
      ).toThrow('Push body text is required');
    });

    it('accepts valid', () => {
      expect(() =>
        PushHttpValidator.validateSend({
          tokens: ['tok'],
          title: 'Hi',
          body: 'Message',
        }),
      ).not.toThrow();
    });
  });

  describe('validateBulk', () => {
    it('rejects null', () => {
      expect(() => PushHttpValidator.validateBulk(null)).toThrow(
        'Bulk push body is required',
      );
    });

    it('rejects empty tokens', () => {
      expect(() => PushHttpValidator.validateBulk({ tokens: [] })).toThrow(
        'Bulk push tokens are required',
      );
    });

    it('accepts valid', () => {
      expect(() => PushHttpValidator.validateBulk({ tokens: ['t'] })).not.toThrow();
    });
  });
});
