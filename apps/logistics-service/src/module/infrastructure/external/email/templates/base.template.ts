/**
 * Base email template
 * @module logistics-service/infrastructure/external/email/templates
 */
export interface TemplateData {
  readonly [key: string]: string | number | boolean;
}

export abstract class BaseEmailTemplate {
  abstract readonly templateId: string;
  abstract readonly subject: string;

  abstract render(data: TemplateData): { html: string; text: string };

  protected wrapHtml(title: string, bodyHtml: string): string {
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${title}</title></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
<div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">
<h1 style="color:#1a1a1a;font-size:22px;margin-top:0;">${title}</h1>
${bodyHtml}
<hr style="margin:30px 0;border:none;border-top:1px solid #e0e0e0;">
<p style="color:#888;font-size:12px;">Vubon Logistics — Automated message</p>
</div>
</body></html>`;
  }
}
