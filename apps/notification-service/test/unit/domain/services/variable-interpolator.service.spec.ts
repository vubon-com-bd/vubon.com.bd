import { VariableInterpolatorService } from '@domain/services/variable-interpolator.service.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const v = (name: string, type: any = 'string', required = true, defaultValue?: string) =>
  TemplateVariableVO.create({ name, type, required, defaultValue });

describe('VariableInterpolatorService', () => {
  describe('interpolate()', () => {
    it('passes through present values', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { name: 'Rahim' },
        variables: [v('name')],
      });
      expect(result.data.name).toBe('Rahim');
      expect(result.missingRequired).toEqual([]);
    });

    it('throws on missing required (strict)', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: {},
          variables: [v('name')],
          strategy: 'strict',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('uses default when missing (lenient)', () => {
      const result = VariableInterpolatorService.interpolate({
        data: {},
        variables: [v('name', 'string', false, 'Guest')],
        strategy: 'lenient',
      });
      expect(result.data.name).toBe('Guest');
      expect(result.appliedDefaults).toContain('name');
    });

    it('coerces number', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { amount: '100' },
        variables: [v('amount', 'number')],
      });
      expect(result.data.amount).toBe(100);
    });

    it('coerces boolean true', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { active: 'true' },
        variables: [v('active', 'boolean')],
      });
      expect(result.data.active).toBe(true);
    });

    it('coerces boolean false', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { active: 'false' },
        variables: [v('active', 'boolean')],
      });
      expect(result.data.active).toBe(false);
    });

    it('throws on invalid boolean', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: { active: 'maybe' },
          variables: [v('active', 'boolean')],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('coerces date to ISO', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { date: '2025-01-15' },
        variables: [v('date', 'date')],
      });
      expect(typeof result.data.date).toBe('string');
      expect(result.data.date as string).toContain('2025-01-15');
    });

    it('throws on invalid date', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: { date: 'not-a-date' },
          variables: [v('date', 'date')],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('validates url', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { url: 'https://example.com' },
        variables: [v('url', 'url')],
      });
      expect(result.data.url).toBe('https://example.com');
    });

    it('throws on invalid url', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: { url: 'not-a-url' },
          variables: [v('url', 'url')],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('validates email', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { email: 'u@example.com' },
        variables: [v('email', 'email')],
      });
      expect(result.data.email).toBe('u@example.com');
    });

    it('throws on invalid email', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: { email: 'bad' },
          variables: [v('email', 'email')],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('coerces number failure', () => {
      expect(() =>
        VariableInterpolatorService.interpolate({
          data: { amount: 'abc' },
          variables: [v('amount', 'number')],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('null stays null (not undefined)', () => {
      // null !== undefined → treated as "present" by interpolator
      const result = VariableInterpolatorService.interpolate({
        data: { name: null },
        variables: [v('name', 'string', false, 'default')],
        strategy: 'lenient',
      });
      expect(result.data.name).toBeNull();
    });

    it('uses default for undefined value', () => {
      const result = VariableInterpolatorService.interpolate({
        data: { name: undefined },
        variables: [v('name', 'string', false, 'default')],
        strategy: 'lenient',
      });
      expect(result.data.name).toBe('default');
    });
  });
});
