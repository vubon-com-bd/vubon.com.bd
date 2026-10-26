/**
 * NotificationHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 *
 * Wraps application validators → BadRequestException.
 * Application validator mocks simulate pass/fail.
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// ─── Mock app validator BEFORE importing HTTP validator ───
const mockValidateSend = jest.fn<() => void>();
const mockValidateSendBulk = jest.fn<() => void>();
const mockValidateResend = jest.fn<() => void>();
const mockValidateCancel = jest.fn<() => void>();

jest.mock('@application/validators/notification.validator.js', () => ({
  NotificationValidator: {
    validateSend: mockValidateSend,
    validateSendBulk: mockValidateSendBulk,
    validateResend: mockValidateResend,
    validateCancel: mockValidateCancel,
  },
}));

import { NotificationHttpValidator } from '@interfaces/validators/notification.validator.js';

describe('NotificationHttpValidator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateSend', () => {
    it('passes through when app validator succeeds', () => {
      mockValidateSend.mockImplementationOnce(() => undefined);
      expect(() => NotificationHttpValidator.validateSend({ x: 1 })).not.toThrow();
      expect(mockValidateSend).toHaveBeenCalledTimes(1);
    });

    it('throws BadRequestException when app validator fails', () => {
      mockValidateSend.mockImplementationOnce(() => {
        throw new Error('Invalid type');
      });
      expect(() => NotificationHttpValidator.validateSend({})).toThrow('Invalid type');
    });

    it('uses fallback message for non-Error throws', () => {
      mockValidateSend.mockImplementationOnce(() => {
        throw 'string-error';
      });
      expect(() => NotificationHttpValidator.validateSend({})).toThrow(
        'Invalid send request',
      );
    });
  });

  describe('validateSendBulk', () => {
    it('passes through on success', () => {
      expect(() => NotificationHttpValidator.validateSendBulk({ x: 1 })).not.toThrow();
    });

    it('wraps error to BadRequestException', () => {
      mockValidateSendBulk.mockImplementationOnce(() => {
        throw new Error('bulk error');
      });
      expect(() => NotificationHttpValidator.validateSendBulk({})).toThrow('bulk error');
    });

    it('uses fallback', () => {
      mockValidateSendBulk.mockImplementationOnce(() => {
        throw 'oops';
      });
      expect(() => NotificationHttpValidator.validateSendBulk({})).toThrow(
        'Invalid bulk request',
      );
    });
  });

  describe('validateResend', () => {
    it('passes on success', () => {
      expect(() => NotificationHttpValidator.validateResend({})).not.toThrow();
    });

    it('wraps error', () => {
      mockValidateResend.mockImplementationOnce(() => {
        throw new Error('resend err');
      });
      expect(() => NotificationHttpValidator.validateResend({})).toThrow('resend err');
    });

    it('fallback', () => {
      mockValidateResend.mockImplementationOnce(() => {
        throw 42;
      });
      expect(() => NotificationHttpValidator.validateResend({})).toThrow(
        'Invalid resend request',
      );
    });
  });

  describe('validateCancel', () => {
    it('passes on success', () => {
      expect(() => NotificationHttpValidator.validateCancel({})).not.toThrow();
    });

    it('wraps error', () => {
      mockValidateCancel.mockImplementationOnce(() => {
        throw new Error('cancel err');
      });
      expect(() => NotificationHttpValidator.validateCancel({})).toThrow('cancel err');
    });

    it('fallback', () => {
      mockValidateCancel.mockImplementationOnce(() => {
        throw null;
      });
      expect(() => NotificationHttpValidator.validateCancel({})).toThrow(
        'Invalid cancel request',
      );
    });
  });
});
