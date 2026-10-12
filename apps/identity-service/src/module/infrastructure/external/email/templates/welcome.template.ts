import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface WelcomeData extends BaseTemplateData {
  readonly ctaUrl: string;
}

export class WelcomeTemplate extends BaseTemplate<WelcomeData> {
  readonly name = 'welcome';

  subject(data: WelcomeData): string {
    return `Welcome to Vubon, ${data.recipientName}!`;
  }

  render(data: WelcomeData): string {
    return this.wrap(
      `<h2>Welcome, ${data.recipientName}!</h2>
<p>Thanks for joining Vubon. We're excited to have you on board.</p>
<p style="margin: 24px 0;">
  <a href="${data.ctaUrl}" style="background: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Get Started</a>
</p>
<p>If you have any questions, just reply to this email.</p>`,
      'Welcome',
    );
  }
}
