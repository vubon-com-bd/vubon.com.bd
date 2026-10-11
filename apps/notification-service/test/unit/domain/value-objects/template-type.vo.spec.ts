import { describe, it, expect } from '@jest/globals';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';

describe('TemplateTypeVO', () => {
  it('create + reconstitute', () => {
    expect(TemplateTypeVO.create('email').value).toBe('email');
    expect(() => TemplateTypeVO.create('bad')).toThrow();
    expect(TemplateTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(TemplateTypeVO.email().value).toBe('email');
    expect(TemplateTypeVO.sms().value).toBe('sms');
    expect(TemplateTypeVO.push().value).toBe('push');
    expect(TemplateTypeVO.inApp().value).toBe('in_app');
    expect(TemplateTypeVO.webhook().value).toBe('webhook');
    expect(TemplateTypeVO.whatsapp().value).toBe('whatsapp');
  });
  it('predicates', () => {
    expect(TemplateTypeVO.email().isEmail()).toBe(true);
    expect(TemplateTypeVO.sms().isSms()).toBe(true);
    expect(TemplateTypeVO.push().isPush()).toBe(true);
    expect(TemplateTypeVO.inApp().isInApp()).toBe(true);
    expect(TemplateTypeVO.webhook().isWebhook()).toBe(true);
    expect(TemplateTypeVO.whatsapp().isWhatsapp()).toBe(true);
  });
  it('supportsHtml', () => {
    expect(TemplateTypeVO.email().supportsHtml()).toBe(true);
    expect(TemplateTypeVO.sms().supportsHtml()).toBe(false);
  });
});
