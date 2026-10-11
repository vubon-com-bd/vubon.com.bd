import { describe, it, expect } from '@jest/globals';
import { TemplateVariableNameVO } from '../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';

describe('TemplateVariableNameVO', () => {
  it('create valid', () => {
    expect(TemplateVariableNameVO.create('orderNumber').value).toBe('orderNumber');
    expect(TemplateVariableNameVO.create('_x').value).toBe('_x');
  });
  it('rejects invalid', () => {
    expect(() => TemplateVariableNameVO.create('1abc')).toThrow();
    expect(() => TemplateVariableNameVO.create('with-dash')).toThrow();
  });
  it('rejects empty', () => {
    expect(() => TemplateVariableNameVO.create('')).toThrow();
  });
  it('toPlaceholder', () => {
    expect(TemplateVariableNameVO.create('name').toPlaceholder()).toBe('{{name}}');
  });
  it('reconstitute', () => {
    expect(TemplateVariableNameVO.reconstitute('any').value).toBe('any');
  });
});
