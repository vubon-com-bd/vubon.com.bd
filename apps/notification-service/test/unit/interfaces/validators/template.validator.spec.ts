/**
 * TemplateHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockCreate = jest.fn<() => void>();
const mockUpdate = jest.fn<() => void>();
const mockTest = jest.fn<() => void>();

jest.mock('@application/validators/template.validator.js', () => ({
  TemplateValidator: {
    validateCreate: mockCreate,
    validateUpdate: mockUpdate,
    validateTest: mockTest,
  },
}));

import { TemplateHttpValidator } from '@interfaces/validators/template.validator.js';

describe('TemplateHttpValidator', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('validateCreate', () => {
    it('passes on success', () => {
      expect(() => TemplateHttpValidator.validateCreate({})).not.toThrow();
    });

    it('wraps error', () => {
      mockCreate.mockImplementationOnce(() => {
        throw new Error('bad template');
      });
      expect(() => TemplateHttpValidator.validateCreate({})).toThrow('bad template');
    });

    it('fallback message', () => {
      mockCreate.mockImplementationOnce(() => {
        throw null;
      });
      expect(() => TemplateHttpValidator.validateCreate({})).toThrow(
        'Invalid template create',
      );
    });
  });

  describe('validateUpdate', () => {
    it('passes on success', () => {
      expect(() => TemplateHttpValidator.validateUpdate({})).not.toThrow();
    });

    it('wraps error', () => {
      mockUpdate.mockImplementationOnce(() => {
        throw new Error('bad update');
      });
      expect(() => TemplateHttpValidator.validateUpdate({})).toThrow('bad update');
    });

    it('fallback', () => {
      mockUpdate.mockImplementationOnce(() => {
        throw 42;
      });
      expect(() => TemplateHttpValidator.validateUpdate({})).toThrow(
        'Invalid template update',
      );
    });
  });

  describe('validateTest', () => {
    it('passes on success', () => {
      expect(() => TemplateHttpValidator.validateTest({})).not.toThrow();
    });

    it('wraps error', () => {
      mockTest.mockImplementationOnce(() => {
        throw new Error('bad test');
      });
      expect(() => TemplateHttpValidator.validateTest({})).toThrow('bad test');
    });

    it('fallback', () => {
      mockTest.mockImplementationOnce(() => {
        throw undefined;
      });
      expect(() => TemplateHttpValidator.validateTest({})).toThrow(
        'Invalid template test',
      );
    });
  });
});
