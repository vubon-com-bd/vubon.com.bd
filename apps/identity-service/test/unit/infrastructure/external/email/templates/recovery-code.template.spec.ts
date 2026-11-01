import { describe, it, expect, beforeEach } from '@jest/globals';
import { RecoveryCodeTemplate } from '@infrastructure/external/email/templates/recovery-code.template.js';

describe('RecoveryCodeTemplate', () => {
  let t: RecoveryCodeTemplate;

  beforeEach(() => {
    t = new RecoveryCodeTemplate();
  });

  it('name is recovery-code', () => {
    expect(t.name).toBe('recovery-code');
  });

  it('subject mentions recovery codes', () => {
    const s = t.subject({ recipientName: 'X', codes: ['ABCD1234'] });
    expect(s.toLowerCase()).toMatch(/recovery|codes/);
  });

  it('render includes all codes', () => {
    const html = t.render({
      recipientName: 'X',
      codes: ['ABCD1234', 'EFGH5678', 'IJKL9012'],
    });
    expect(html).toContain('ABCD1234');
    expect(html).toContain('EFGH5678');
    expect(html).toContain('IJKL9012');
  });
});
