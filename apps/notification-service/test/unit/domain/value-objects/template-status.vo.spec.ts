import { describe, it, expect } from '@jest/globals';
import { TemplateStatusVO } from '../../../../src/module/domain/value-objects/primitives/template-status.vo.js';

describe('TemplateStatusVO', () => {
  it('create + reconstitute', () => {
    expect(TemplateStatusVO.create('active').value).toBe('active');
    expect(() => TemplateStatusVO.create('bad')).toThrow();
    expect(TemplateStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(TemplateStatusVO.draft().value).toBe('draft');
    expect(TemplateStatusVO.active().value).toBe('active');
    expect(TemplateStatusVO.inactive().value).toBe('inactive');
    expect(TemplateStatusVO.archived().value).toBe('archived');
    expect(TemplateStatusVO.deprecated().value).toBe('deprecated');
  });
  it('predicates', () => {
    expect(TemplateStatusVO.draft().isDraft()).toBe(true);
    expect(TemplateStatusVO.active().isActive()).toBe(true);
    expect(TemplateStatusVO.inactive().isInactive()).toBe(true);
    expect(TemplateStatusVO.archived().isArchived()).toBe(true);
    expect(TemplateStatusVO.deprecated().isDeprecated()).toBe(true);
  });
  it('isUsable + isFinal', () => {
    expect(TemplateStatusVO.active().isUsable()).toBe(true);
    expect(TemplateStatusVO.draft().isUsable()).toBe(false);
    expect(TemplateStatusVO.archived().isFinal()).toBe(true);
    expect(TemplateStatusVO.deprecated().isFinal()).toBe(true);
    expect(TemplateStatusVO.active().isFinal()).toBe(false);
  });
});
