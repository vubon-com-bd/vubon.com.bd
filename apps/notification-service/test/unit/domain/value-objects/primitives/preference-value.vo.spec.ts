import { PreferenceValueVO } from '@domain/primitives/preference-value.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PreferenceValueVO', () => {
  describe('create()', () => {
    it('accepts boolean true', () => {
      const vo = PreferenceValueVO.create(true);
      expect(vo.isBoolean).toBe(true);
      expect(vo.asBoolean).toBe(true);
      expect(vo.asFrequency).toBeUndefined();
    });

    it('accepts boolean false', () => {
      const vo = PreferenceValueVO.create(false);
      expect(vo.asBoolean).toBe(false);
    });

    it('accepts valid frequency', () => {
      const vo = PreferenceValueVO.create('daily');
      expect(vo.isFrequency).toBe(true);
      expect(vo.asFrequency).toBe('daily');
      expect(vo.asBoolean).toBeUndefined();
    });

    it('normalizes frequency case', () => {
      expect(PreferenceValueVO.create('DAILY').asFrequency).toBe('daily');
    });

    it('rejects invalid frequency', () => {
      expect(() => PreferenceValueVO.create('sometimes')).toThrow(ValidationError);
    });

    it('rejects number', () => {
      expect(() => PreferenceValueVO.create(1 as any)).toThrow(ValidationError);
    });

    it('rejects null', () => {
      expect(() => PreferenceValueVO.create(null as any)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('accepts boolean', () => {
      expect(PreferenceValueVO.reconstitute(true).asBoolean).toBe(true);
    });
    it('accepts frequency', () => {
      expect(PreferenceValueVO.reconstitute('weekly').asFrequency).toBe('weekly');
    });
  });
});
