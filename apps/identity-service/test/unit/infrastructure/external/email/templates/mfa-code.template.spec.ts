import { describe, it, expect, beforeEach } from '@jest/globals';
import { MfaCodeTemplate } from '@infrastructure/external/email/templates/mfa-code.template.js';

describe('MfaCodeTemplate', () => {
  let t: MfaCodeTemplate;

  beforeEach(() => {
    t = new MfaCodeTemplate();
  });

  it('name is mfa-code', () => {
    expect(t.name).toBe('mfa-code');
  });

  it('subject mentions code', () => {
    const s = t.subject({ recipientName: 'X', code: '123456', expiresInMinutes: 5 });
    expect(s.toLowerCase()).toContain('code');
  });

  it('render includes code', () => {
    const html = t.render({ recipientName: 'X', code: '654321', expiresInMinutes: 5 });
    expect(html).toContain('654321');
  });
});
