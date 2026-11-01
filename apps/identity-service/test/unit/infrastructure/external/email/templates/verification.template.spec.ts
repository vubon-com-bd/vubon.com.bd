import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerificationTemplate } from '@infrastructure/external/email/templates/verification.template.js';

describe('VerificationTemplate', () => {
  let t: VerificationTemplate;

  beforeEach(() => {
    t = new VerificationTemplate();
  });

  it('name is verification', () => {
    expect(t.name).toBe('verification');
  });

  it('subject mentions verify', () => {
    const s = t.subject({ recipientName: 'X', code: '123456' });
    expect(s.toLowerCase()).toContain('verif');
  });

  it('render includes code', () => {
    const html = t.render({ recipientName: 'X', code: '123456' });
    expect(html).toContain('123456');
  });

  it('render includes expiry minutes', () => {
    const html = t.render({ recipientName: 'X', code: '123456', expiresInMinutes: 10 });
    expect(html).toContain('10');
  });
});
