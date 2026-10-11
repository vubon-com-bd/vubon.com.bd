import { describe, it, expect } from '@jest/globals';
import { TemplateVariableVO } from '../../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { TemplateVariableNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';

describe('TemplateVariableVO', () => {
  it('create valid string', () => {
    const vo = TemplateVariableVO.create({
      name: TemplateVariableNameVO.create('orderId'),
      type: 'string',
      required: true,
    });
    expect(vo.name.value).toBe('orderId');
    expect(vo.hasDefault()).toBe(false);
  });
  it('create with default', () => {
    const vo = TemplateVariableVO.create({
      name: TemplateVariableNameVO.create('x'),
      type: 'number',
      required: false,
      defaultValue: '0',
    });
    expect(vo.hasDefault()).toBe(true);
  });
  it('rejects invalid type', () => {
    expect(() =>
      TemplateVariableVO.create({
        name: TemplateVariableNameVO.create('x'),
        type: 'invalid' as never,
        required: false,
      }),
    ).toThrow();
  });
  it('rejects long description', () => {
    expect(() =>
      TemplateVariableVO.create({
        name: TemplateVariableNameVO.create('x'),
        type: 'string',
        required: false,
        description: 'x'.repeat(501),
      }),
    ).toThrow();
  });
  it('all valid types', () => {
    const types: ('string' | 'number' | 'boolean' | 'date' | 'url' | 'email')[] = [
      'string', 'number', 'boolean', 'date', 'url', 'email',
    ];
    for (const t of types) {
      const vo = TemplateVariableVO.create({
        name: TemplateVariableNameVO.create('x'),
        type: t,
        required: false,
      });
      expect(vo.type).toBe(t);
    }
  });
  it('reconstitute', () => {
    const vo = TemplateVariableVO.reconstitute({
      name: TemplateVariableNameVO.create('x'),
      type: 'string',
      required: false,
    });
    expect(vo.type).toBe('string');
  });
});
