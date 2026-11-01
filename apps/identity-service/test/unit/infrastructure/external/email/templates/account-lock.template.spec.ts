import { describe, it, expect, beforeEach } from '@jest/globals';
import { AccountLockTemplate } from '@infrastructure/external/email/templates/account-lock.template.js';

describe('AccountLockTemplate', () => {
  let t: AccountLockTemplate;

  beforeEach(() => {
    t = new AccountLockTemplate();
  });

  it('name is account-lock', () => {
    expect(t.name).toBe('account-lock');
  });

  it('subject mentions lock', () => {
    const s = t.subject({ recipientName: 'X', lockedUntil: '2026-01-01T00:00:00Z' });
    expect(s.toLowerCase()).toContain('lock');
  });

  it('render includes lockedUntil', () => {
    const until = '2026-01-01T12:00:00Z';
    const html = t.render({ recipientName: 'X', lockedUntil: until });
    expect(html).toContain(until);
  });
});
