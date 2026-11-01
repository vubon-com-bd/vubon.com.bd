import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeviceLoginTemplate } from '@infrastructure/external/email/templates/device-login.template.js';

describe('DeviceLoginTemplate', () => {
  let t: DeviceLoginTemplate;

  beforeEach(() => {
    t = new DeviceLoginTemplate();
  });

  it('name is device-login', () => {
    expect(t.name).toBe('device-login');
  });

  it('subject mentions login or device', () => {
    const s = t.subject({ recipientName: 'X', device: 'Chrome', ip: '1.2.3.4' });
    expect(s.toLowerCase()).toMatch(/login|device|new/);
  });

  it('render includes device + ip', () => {
    const html = t.render({
      recipientName: 'X',
      device: 'Chrome on Windows',
      ip: '1.2.3.4',
    });
    expect(html).toContain('Chrome on Windows');
    expect(html).toContain('1.2.3.4');
  });
});
