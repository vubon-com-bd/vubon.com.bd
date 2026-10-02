/**
 * Email Template base types
 * @module cart-service/infrastructure/external/email/templates
 */
export interface EmailTemplateVariables {
  readonly [key: string]: string | number | boolean | undefined;
}

export interface RenderedEmail {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
}

export function renderSimpleEmail(params: {
  title: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
}): { html: string; text: string } {
  const ctaHtml = params.ctaText && params.ctaUrl
    ? `<p><a href="${params.ctaUrl}" style="background:#007bff;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">${params.ctaText}</a></p>`
    : '';
  return {
    html: `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;"><h2>${params.title}</h2><p>${params.body}</p>${ctaHtml}</body></html>`,
    text: `${params.title}\n\n${params.body}${params.ctaUrl ? `\n\n${params.ctaText ?? 'Open'}: ${params.ctaUrl}` : ''}`,
  };
}
