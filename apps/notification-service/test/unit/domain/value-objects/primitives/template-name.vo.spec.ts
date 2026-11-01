import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { InvalidTemplateVariableError } from '@domain/errors/template.errors.js';

describe('TemplateNameVO', () => {
  describe('create()', () => {
    it('accepts valid name', () => {
      expect(TemplateNameVO.create('Order Confirmation').value).toBe('Order Confirmation');
    });

    it('normalizes whitespace', () => {
      expect(TemplateNameVO.create('  Order    Confirmation  ').value).toBe('Order Confirmation');
    });

    it('rejects too short (<3)', () => {
      expect(() => TemplateNameVO.create('ab')).toThrow(InvalidTemplateVariableError);
    });

    it('rejects too long (>100)', () => {
      expect(() => TemplateNameVO.create('a'.repeat(101))).toThrow(InvalidTemplateVariableError);
    });

    it('rejects non-string', () => {
      expect(() => TemplateNameVO.create(123 as any)).toThrow(InvalidTemplateVariableError);
    });
  });

  describe('toSlug()', () => {
    it('converts to URL-safe slug', () => {
      expect(TemplateNameVO.create('Order Confirmation').toSlug()).toBe('order-confirmation');
    });

    it('removes special characters', () => {
      expect(TemplateNameVO.create('Hi There! 2025').toSlug()).toBe('hi-there-2025');
    });

    it('collapses multiple hyphens', () => {
      expect(TemplateNameVO.create('a   b   c').toSlug()).toBe('a-b-c');
    });

    it('trims leading/trailing hyphens', () => {
      expect(TemplateNameVO.create('  hello  ').toSlug()).toBe('hello');
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(TemplateNameVO.reconstitute('ok').value).toBe('ok');
    });
  });
});
