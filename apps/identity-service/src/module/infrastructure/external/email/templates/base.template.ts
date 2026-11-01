/**
 * Base Email Template
 * @module identity-service/infrastructure/external/email/templates
 */
export interface BaseTemplateData {
  readonly recipientName: string;
  readonly [key: string]: unknown;
}

export abstract class BaseTemplate<TData extends BaseTemplateData = BaseTemplateData> {
  abstract readonly name: string;
  abstract subject(data: TData): string;
  abstract render(data: TData): string;

  protected wrap(body: string, title: string): string {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1f2937;">
<div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 24px;">
  <h1 style="color: #2563eb; margin: 0;">Vubon</h1>
</div>
${body}
<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
  © ${new Date().getFullYear()} Vubon.com.bd — All rights reserved.
</div>
</body></html>`;
  }
}
