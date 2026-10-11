import { describe, it, expect } from '@jest/globals';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';

describe('TemplateCategoryVO', () => {
  it('create + reconstitute', () => {
    expect(TemplateCategoryVO.create('order').value).toBe('order');
    expect(() => TemplateCategoryVO.create('bad')).toThrow();
    expect(TemplateCategoryVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(TemplateCategoryVO.auth().value).toBe('auth');
    expect(TemplateCategoryVO.order().value).toBe('order');
    expect(TemplateCategoryVO.payment().value).toBe('payment');
    expect(TemplateCategoryVO.shipping().value).toBe('shipping');
    expect(TemplateCategoryVO.marketing().value).toBe('marketing');
    expect(TemplateCategoryVO.support().value).toBe('support');
    expect(TemplateCategoryVO.system().value).toBe('system');
    expect(TemplateCategoryVO.security().value).toBe('security');
  });
});
