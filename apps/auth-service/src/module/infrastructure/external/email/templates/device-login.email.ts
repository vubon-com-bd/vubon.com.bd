import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const DeviceLoginEmailTemplate: EmailTemplate = {
  name: 'device-login',
  subject: 'New login from unknown device',
  html: `
    <h2>New Device Login</h2>
    <p>Hi {{name}},</p>
    <p>A new login was detected from an unknown device:</p>
    <ul>
      <li>IP: {{ip}}</li>
      <li>Device: {{device}}</li>
      <li>Time: {{time}}</li>
    </ul>
    <p>If this wasn't you, secure your account immediately.</p>
  `,
  text: 'New login: IP={{ip}}, Device={{device}}, Time={{time}}',
  variables: ['name', 'ip', 'device', 'time'],
};
