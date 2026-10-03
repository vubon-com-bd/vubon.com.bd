/**
 * New Device Login Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const DeviceLoginEmailTemplate = {
  name: 'device-login',
  subject: 'New login to your Vubon account',
  body: `
    <h2>New device login detected</h2>
    <ul>
      <li>Device: {{deviceName}}</li>
      <li>IP: {{ip}}</li>
      <li>Time: {{occurredAt}}</li>
    </ul>
    <p>If this wasn't you, secure your account immediately.</p>
  `,
} as const;
