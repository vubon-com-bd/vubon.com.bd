import { TemplateVariablesVO } from '@domain/composites/template-variable.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const v = (name: string, required = true) =>
  TemplateVariableVO.create({ name, type: 'string', required });

describe('TemplateVariablesVO', () => {
  describe('create()', () => {
    it('accepts empty list', () => {
      const vo = TemplateVariablesVO.create({ variables: [] });
      expect(vo.count).toBe(0);
      expect(vo.isEmpty).toBe(true);
    });

    it('accepts multiple variables', () => {
      const vo = TemplateVariablesVO.create({ variables: [v('a'), v('b')] });
      expect(vo.count).toBe(2);
    });

    it('rejects duplicate names', () => {
      expect(() =>
        TemplateVariablesVO.create({ variables: [v('a'), v('a')] }),
      ).toThrow(ValidationError);
    });

    it('empty() factory', () => {
      const vo = TemplateVariablesVO.empty();
      expect(vo.count).toBe(0);
      expect(vo.isEmpty).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = TemplateVariablesVO.reconstitute({ variables: [] });
      expect(vo.count).toBe(0);
    });
  });

  describe('filters', () => {
    const vo = TemplateVariablesVO.create({
      variables: [v('a', true), v('b', false), v('c', true)],
    });

    it('required', () => {
      expect(vo.required.length).toBe(2);
    });

    it('optional', () => {
      expect(vo.optional.length).toBe(1);
    });
  });

  describe('has / get', () => {
    const vo = TemplateVariablesVO.create({ variables: [v('a'), v('b')] });

    it('has true for existing', () => {
      expect(vo.has('a')).toBe(true);
    });

    it('has false for missing', () => {
      expect(vo.has('z')).toBe(false);
    });

    it('get returns variable', () => {
      expect(vo.get('a')?.name).toBe('a');
    });

    it('get returns undefined for missing', () => {
      expect(vo.get('z')).toBeUndefined();
    });
  });

  describe('missingFrom()', () => {
    const vo = TemplateVariablesVO.create({ variables: [v('a', true), v('b', true), v('c', false)] });

    it('returns missing required', () => {
      expect(vo.missingFrom({ a: 1 })).toEqual(['b']);
    });

    it('empty when all present', () => {
      expect(vo.missingFrom({ a: 1, b: 2 })).toEqual([]);
    });

    it('ignores optional', () => {
      expect(vo.missingFrom({ a: 1, b: 2 })).not.toContain('c');
    });
  });

  describe('getters', () => {
    const vo = TemplateVariablesVO.create({ variables: [v('a')] });
    it('variables getter', () => {
      expect(vo.variables.length).toBe(1);
    });
  });
});
