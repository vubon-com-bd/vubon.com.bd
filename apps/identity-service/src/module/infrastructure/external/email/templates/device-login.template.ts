import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface DeviceLoginData extends BaseTemplateData {
  readonly device: string;
  readonly ip: string;
}

export class DeviceLoginTemplate extends BaseTemplate<DeviceLoginData> {
  readonly name = 'device-login';

  subject(data: DeviceLoginData): string {
    return `New login from ${data.device}`;
  }

  render(data: DeviceLoginData): string {
    return this.wrap(
      `<h2>New Device Login</h2>
<p>Hi ${data.recipientName},</p>
<p>A new login to your account was detected:</p>
<table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
  <tr><td style="padding: 8px; background: #f3f4f6;">Device</td><td style="padding: 8px;">${data.device}</td></tr>
  <tr><td style="padding: 8px; background: #f3f4f6;">IP Address</td><td style="padding: 8px; font-family: monospace;">${data.ip}</td></tr>
</table>
<p>If this was you, you can ignore this email.</p>
<p style="color: #dc2626;">If this wasn't you, secure your account immediately by changing your password.</p>`,
      'New Login',
    );
  }
}
