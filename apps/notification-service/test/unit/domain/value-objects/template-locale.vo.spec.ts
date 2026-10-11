import { describe, it, expect } from '@jest/globals';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';

describe('TemplateLocaleVO', () => {
  it('create simple locale', () => {
    expect(TemplateLocaleVO.create('en').value).toBe('en');
  });
  it('create locale with region', () => {
    expect(TemplateLocaleVO.create('en-US').value).toBe('en-US');
  });
  it('rejects invalid', () => {
    expect(() => TemplateLocaleVO.create('english')).toThrow();
  });
  it('rejects empty', () => {
    expect(() => TemplateLocaleVO.create('')).toThrow();
  });
  it('named constructors', () => {
    expect(TemplateLocaleVO.en().value).toBe('en');
    expect(TemplateLocaleVO.bn().value).toBe('bn');
  });
  it('language + region', () => {
    const vo = TemplateLocaleVO.create('en-US');
    expect(vo.language).toBe('en');
    expect(vo.region).toBe('US');
  });
  it('reconstitute', () => {
    expect(TemplateLocaleVO.reconstitute('any').value).toBe('any');
  });
});
