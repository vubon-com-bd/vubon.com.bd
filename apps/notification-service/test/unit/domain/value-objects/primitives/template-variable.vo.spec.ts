import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { InvalidTemplateVariableError } from '@domain/errors/template.errors.js';

const make = (overrides: Partial<Parameters<typeof TemplateVariableVO.create>[0]> = {}) => ({
  name: 'userName',
  type: 'string' as const,
  required: true,
  ...overrides,
});

describe('TemplateVariableVO', () => {
  describe('create()', () => {
    it('accepts valid required variable', () => {
      const vo = TemplateVariableVO.create(make());
      expect(vo.name).toBe('userName');
      expect(vo.required).toBe(true);
    });

    it('accepts optional with defaultValue', () => {
      const vo = TemplateVariableVO.create(
        make({ name: 'greeting', required: false, defaultValue: 'Hi' }),
      );
      expect(vo.defaultValue).toBe('Hi');
    });

    it('rejects invalid name pattern', () => {
      expect(() => TemplateVariableVO.create(make({ name: '123abc' }))).toThrow(InvalidTemplateVariableError);
    });

    it('rejects name with spaces', () => {
      expect(() => TemplateVariableVO.create(make({ name: 'user name' }))).toThrow(InvalidTemplateVariableError);
    });

    it('rejects too-long name (>50)', () => {
      expect(() => TemplateVariableVO.create(make({ name: 'a'.repeat(51) }))).toThrow(InvalidTemplateVariableError);
    });

    it('rejects invalid type', () => {
      expect(() =>
        TemplateVariableVO.create(make({ type: 'unknown' as any })),
      ).toThrow(InvalidTemplateVariableError);
    });

    it('rejects required with defaultValue', () => {
      expect(() =>
        TemplateVariableVO.create(make({ required: true, defaultValue: 'x' })),
      ).toThrow(InvalidTemplateVariableError);
    });

    it('accepts all valid types', () => {
      (['string', 'number', 'boolean', 'date', 'url', 'email'] as const).forEach((type) => {
        expect(() => TemplateVariableVO.create(make({ type }))).not.toThrow();
      });
    });

    it('accepts underscore prefix', () => {
      expect(() => TemplateVariableVO.create(make({ name: '_x' }))).not.toThrow();
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = TemplateVariableVO.reconstitute(make());
      expect(vo.name).toBe('userName');
    });
  });

  describe('getters', () => {
    it('exposes all properties', () => {
      const vo = TemplateVariableVO.create({
        name: 'x',
        type: 'email',
        required: false,
        defaultValue: 'a@b.com',
        description: 'user email',
      });
      expect(vo.name).toBe('x');
      expect(vo.type).toBe('email');
      expect(vo.required).toBe(false);
      expect(vo.defaultValue).toBe('a@b.com');
      expect(vo.description).toBe('user email');
    });
  });
});
