import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { InvalidTemplateContentError } from '@domain/errors/template.errors.js';

describe('TemplateContentVO', () => {
  it('accepts valid content', () => {
    expect(TemplateContentVO.create('Hello {{name}}').value).toBe('Hello {{name}}');
  });

  it('rejects empty', () => {
    expect(() => TemplateContentVO.create('')).toThrow(InvalidTemplateContentError);
  });

  it('rejects too long (>500000)', () => {
    expect(() => TemplateContentVO.create('a'.repeat(500_001))).toThrow(InvalidTemplateContentError);
  });

  it('rejects non-string', () => {
    expect(() => TemplateContentVO.create(123 as any)).toThrow(InvalidTemplateContentError);
  });

  describe('extractVariables()', () => {
    it('finds single variable', () => {
      expect(TemplateContentVO.create('Hi {{name}}').extractVariables()).toEqual(['name']);
    });

    it('finds multiple unique variables', () => {
      const content = 'Hello {{name}}, order {{orderId}} for {{name}}';
      expect(TemplateContentVO.create(content).extractVariables()).toEqual(['name', 'orderId']);
    });

    it('handles whitespace inside braces', () => {
      expect(TemplateContentVO.create('{{ name }}').extractVariables()).toEqual(['name']);
    });

    it('returns empty array when no variables', () => {
      expect(TemplateContentVO.create('static text').extractVariables()).toEqual([]);
    });

    it('ignores invalid identifiers (starting with digit)', () => {
      expect(TemplateContentVO.create('{{123abc}}').extractVariables()).toEqual([]);
    });

    it('handles underscore prefix', () => {
      expect(TemplateContentVO.create('{{_private}}').extractVariables()).toEqual(['_private']);
    });
  });

  describe('length', () => {
    it('returns value length', () => {
      expect(TemplateContentVO.create('hello').length).toBe(5);
    });
  });
});
