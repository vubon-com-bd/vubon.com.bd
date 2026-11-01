/**
 * Base Email Template
 * @module product-service/infrastructure/external/email/templates
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
<body style="font-family: sans-serif; max-width: 600px; margin: auto;">
${body}
</body></html>`;
  }
}
