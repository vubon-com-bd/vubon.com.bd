import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface AccountLockData extends BaseTemplateData {
  readonly lockedUntil: string;
}

export class AccountLockTemplate extends BaseTemplate<AccountLockData> {
  readonly name = 'account-lock';

  subject(data: AccountLockData): string {
    return `Your account was locked — ${data.recipientName}`;
  }

  render(data: AccountLockData): string {
    return this.wrap(
      `<h2 style="color: #dc2626;">Account Locked</h2>
<p>Hi ${data.recipientName},</p>
<p>Your account has been temporarily locked due to multiple failed login attempts or suspicious activity.</p>
<p><strong>Locked until:</strong> ${data.lockedUntil}</p>
<p>If this wasn't you, please contact support immediately at <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a>.</p>`,
      'Account Locked',
    );
  }
}
