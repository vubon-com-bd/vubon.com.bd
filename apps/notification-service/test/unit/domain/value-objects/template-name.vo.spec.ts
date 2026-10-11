import { describe, it, expect } from '@jest/globals';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';

describe('TemplateNameVO', () => {
  it('create valid', () => {
    expect(TemplateNameVO.create('Order Confirmation').value).toBe('Order Confirmation');
  });
  it('trims whitespace', () => {
    expect(TemplateNameVO.create('  hi  ').value).toBe('hi');
  });
  it('rejects short', () => {
    expect(() => TemplateNameVO.create('x')).toThrow();
  });
  it('rejects long', () => {
    expect(() => TemplateNameVO.create('x'.repeat(101))).toThrow();
  });
  it('reconstitute', () => {
    expect(TemplateNameVO.reconstitute('any').value).toBe('any');
  });
});
