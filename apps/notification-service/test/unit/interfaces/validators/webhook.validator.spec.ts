/**
 * WebhookHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockCreate = jest.fn<() => void>();
const mockUpdate = jest.fn<() => void>();
const mockTest = jest.fn<() => void>();

jest.mock('@application/validators/webhook.validator.js', () => ({
  WebhookValidator: {
    validateCreate: mockCreate,
    validateUpdate: mockUpdate,
    validateTest: mockTest,
  },
}));

import { WebhookHttpValidator } from '@interfaces/validators/webhook.validator.js';

describe('WebhookHttpValidator', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('validateCreate', () => {
    it('passes on success', () => {
      expect(() => WebhookHttpValidator.validateCreate({})).not.toThrow();
    });

    it('wraps error', () => {
      mockCreate.mockImplementationOnce(() => {
        throw new Error('bad webhook');
      });
      expect(() => WebhookHttpValidator.validateCreate({})).toThrow('bad webhook');
    });

    it('fallback', () => {
      mockCreate.mockImplementationOnce(() => {
        throw null;
      });
      expect(() => WebhookHttpValidator.validateCreate({})).toThrow(
        'Invalid webhook create',
      );
    });
  });

  describe('validateUpdate', () => {
    it('passes on success', () => {
      expect(() => WebhookHttpValidator.validateUpdate({})).not.toThrow();
    });

    it('wraps error', () => {
      mockUpdate.mockImplementationOnce(() => {
        throw new Error('bad update');
      });
      expect(() => WebhookHttpValidator.validateUpdate({})).toThrow('bad update');
    });

    it('fallback', () => {
      mockUpdate.mockImplementationOnce(() => {
        throw 'x';
      });
      expect(() => WebhookHttpValidator.validateUpdate({})).toThrow(
        'Invalid webhook update',
      );
    });
  });

  describe('validateTest', () => {
    it('passes on success', () => {
      expect(() => WebhookHttpValidator.validateTest({})).not.toThrow();
    });

    it('wraps error', () => {
      mockTest.mockImplementationOnce(() => {
        throw new Error('bad test');
      });
      expect(() => WebhookHttpValidator.validateTest({})).toThrow('bad test');
    });

    it('fallback', () => {
      mockTest.mockImplementationOnce(() => {
        throw 42;
      });
      expect(() => WebhookHttpValidator.validateTest({})).toThrow(
        'Invalid webhook test',
      );
    });
  });
});
