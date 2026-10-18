import { describe, it, expect, beforeEach } from '@jest/globals';
import { PasswordResetTemplate } from '@infrastructure/external/email/templates/password-reset.template.js';

describe('PasswordResetTemplate', () => {
  let t: PasswordResetTemplate;

  beforeEach(() => {
    t = new PasswordResetTemplate();
  });

  it('name is password-reset', () => {
    expect(t.name).toBe('password-reset');
  });

  it('subject mentions reset', () => {
    const s = t.subject({ recipientName: 'X', resetUrl: 'https://x.com' });
    expect(s.toLowerCase()).toContain('reset');
  });

  it('render includes reset URL', () => {
    const html = t.render({
      recipientName: 'X',
      resetUrl: 'https://vubon.com.bd/reset?token=abc123',
    });
    expect(html).toContain('https://vubon.com.bd/reset?token=abc123');
  });

  it('render includes expiry', () => {
    const html = t.render({
      recipientName: 'X',
      resetUrl: 'https://x.com',
      expiresInMinutes: 30,
    });
    expect(html).toContain('30');
  });
});
