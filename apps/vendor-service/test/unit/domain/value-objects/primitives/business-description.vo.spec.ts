import { BusinessDescriptionVO } from '../../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BusinessDescriptionVO', () => {
  describe('create()', () => {
    it('creates valid description', () => {
      expect(
        BusinessDescriptionVO.create('We are a leading retailer in Bangladesh.').value,
      ).toBe('We are a leading retailer in Bangladesh.');
    });

    it('trims whitespace', () => {
      const d = BusinessDescriptionVO.create('  Hello world test  ');
      expect(d.value).toBe('Hello world test');
    });

    it('throws on too short', () => {
      expect(() => BusinessDescriptionVO.create('short')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => BusinessDescriptionVO.create('A'.repeat(6000))).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => BusinessDescriptionVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('empty()', () => {
    it('creates empty description', () => {
      expect(BusinessDescriptionVO.empty().value).toBe('');
    });
  });

  describe('wordCount', () => {
    it('counts words', () => {
      expect(BusinessDescriptionVO.create('one two three').wordCount).toBe(3);
    });

    it('returns 0 for empty', () => {
      expect(BusinessDescriptionVO.empty().wordCount).toBe(0);
    });
  });

  describe('preview', () => {
    it('short description unchanged', () => {
      const d = BusinessDescriptionVO.create('short text here');
      expect(d.preview).toBe('short text here');
    });

    it('long description truncated to 160 chars', () => {
      const long = 'a'.repeat(200);
      const d = BusinessDescriptionVO.create(long);
      expect(d.preview.length).toBeLessThanOrEqual(160);
      expect(d.preview.endsWith('...')).toBe(true);
    });
  });

  describe('firstSentence', () => {
    it('extracts first sentence', () => {
      const d = BusinessDescriptionVO.create('First sentence. Second sentence.');
      expect(d.firstSentence).toBe('First sentence.');
    });
  });
});
