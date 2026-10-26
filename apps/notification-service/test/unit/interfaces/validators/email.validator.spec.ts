/**
 * EmailHttpValidator Tests
 * @module notification-service/test/unit/interfaces/validators
 */
import { describe, expect, it } from '@jest/globals';
import { EmailHttpValidator } from '@interfaces/validators/email.validator.js';

describe('EmailHttpValidator', () => {
  describe('validateSend', () => {
    it('rejects null body', () => {
      expect(() => EmailHttpValidator.validateSend(null)).toThrow('Email body is required');
    });

    it('rejects non-object', () => {
      expect(() => EmailHttpValidator.validateSend('x')).toThrow('Email body is required');
    });

    it('rejects empty to array', () => {
      expect(() =>
        EmailHttpValidator.validateSend({ to: [], subject: 'x', text: 'y' }),
      ).toThrow('Email "to" array is required');
    });

    it('rejects missing to', () => {
      expect(() =>
        EmailHttpValidator.validateSend({ subject: 'x', text: 'y' }),
      ).toThrow('Email "to" array is required');
    });

    it('rejects empty subject', () => {
      expect(() =>
        EmailHttpValidator.validateSend({ to: ['a@b.c'], subject: '' }),
      ).toThrow('Email subject is required');
    });

    it('rejects missing body content', () => {
      expect(() =>
        EmailHttpValidator.validateSend({ to: ['a@b.c'], subject: 'x' }),
      ).toThrow('At least one of text, html, or templateId is required');
    });

    it('accepts text', () => {
      expect(() =>
        EmailHttpValidator.validateSend({
          to: ['a@b.c'],
          subject: 'x',
          text: 'hi',
        }),
      ).not.toThrow();
    });

    it('accepts html', () => {
      expect(() =>
        EmailHttpValidator.validateSend({
          to: ['a@b.c'],
          subject: 'x',
          html: '<p>hi</p>',
        }),
      ).not.toThrow();
    });

    it('accepts templateId', () => {
      expect(() =>
        EmailHttpValidator.validateSend({
          to: ['a@b.c'],
          subject: 'x',
          templateId: 't-1',
        }),
      ).not.toThrow();
    });
  });

  describe('validateTemplate', () => {
    it('rejects null', () => {
      expect(() => EmailHttpValidator.validateTemplate(null)).toThrow(
        'Email template body is required',
      );
    });

    it('rejects empty to', () => {
      expect(() => EmailHttpValidator.validateTemplate({ to: [] })).toThrow(
        'Email "to" array is required',
      );
    });

    it('rejects missing templateId', () => {
      expect(() => EmailHttpValidator.validateTemplate({ to: ['a@b.c'] })).toThrow(
        'Email templateId is required',
      );
    });

    it('rejects missing templateData', () => {
      expect(() =>
        EmailHttpValidator.validateTemplate({ to: ['a@b.c'], templateId: 't-1' }),
      ).toThrow('Email templateData is required');
    });

    it('accepts valid', () => {
      expect(() =>
        EmailHttpValidator.validateTemplate({
          to: ['a@b.c'],
          templateId: 't-1',
          templateData: { name: 'John' },
        }),
      ).not.toThrow();
    });
  });

  describe('validateBulk', () => {
    it('rejects null', () => {
      expect(() => EmailHttpValidator.validateBulk(null)).toThrow(
        'Bulk email body is required',
      );
    });

    it('rejects empty recipients', () => {
      expect(() => EmailHttpValidator.validateBulk({ recipients: [] })).toThrow(
        'Bulk email recipients are required',
      );
    });

    it('rejects missing templateId', () => {
      expect(() =>
        EmailHttpValidator.validateBulk({ recipients: [{ email: 'a@b.c' }] }),
      ).toThrow('Bulk email templateId is required');
    });

    it('accepts valid', () => {
      expect(() =>
        EmailHttpValidator.validateBulk({
          recipients: [{ email: 'a@b.c' }],
          templateId: 't-1',
        }),
      ).not.toThrow();
    });
  });
});
