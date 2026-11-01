import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface RecoveryCodeData extends BaseTemplateData {
  readonly codes: readonly string[];
}

export class RecoveryCodeTemplate extends BaseTemplate<RecoveryCodeData> {
  readonly name = 'recovery-code';

  subject(data: RecoveryCodeData): string {
    return `Your recovery codes for ${data.recipientName}`;
  }

  render(data: RecoveryCodeData): string {
    const codeList = data.codes
      .map(
        (c) =>
          `<li style="font-family: monospace; font-size: 14px; padding: 4px; background: #f3f4f6; border-radius: 4px; margin: 4px 0;">${c}</li>`,
      )
      .join('');

    return this.wrap(
      `<h2>Recovery Codes</h2>
<p>Hi ${data.recipientName},</p>
<p>Save these recovery codes in a safe place. Each code can be used once if you lose access to your 2FA device.</p>
<ul style="list-style: none; padding: 0;">${codeList}</ul>
<p style="color: #dc2626; font-weight: 600;">⚠️ Do not share these codes with anyone.</p>`,
      'Recovery Codes',
    );
  }
}
