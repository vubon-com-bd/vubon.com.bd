import { describe, it, expect } from '@jest/globals';
import { EmailProviderVO } from '../../../../src/module/domain/value-objects/primitives/email-provider.vo.js';

describe('EmailProviderVO', () => {
  it('create + reconstitute', () => {
    expect(EmailProviderVO.create('smtp').value).toBe('smtp');
    expect(() => EmailProviderVO.create('bad')).toThrow();
    expect(EmailProviderVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(EmailProviderVO.smtp().value).toBe('smtp');
    expect(EmailProviderVO.sendgrid().value).toBe('sendgrid');
    expect(EmailProviderVO.mailgun().value).toBe('mailgun');
    expect(EmailProviderVO.ses().value).toBe('ses');
    expect(EmailProviderVO.postmark().value).toBe('postmark');
    expect(EmailProviderVO.resend().value).toBe('resend');
    expect(EmailProviderVO.brevo().value).toBe('brevo');
    expect(EmailProviderVO.custom().value).toBe('custom');
  });
  it('supportsBulk', () => {
    expect(EmailProviderVO.sendgrid().supportsBulk()).toBe(true);
    expect(EmailProviderVO.ses().supportsBulk()).toBe(true);
    expect(EmailProviderVO.smtp().supportsBulk()).toBe(false);
  });
});
